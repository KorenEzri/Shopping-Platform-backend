const puppeteer = require('puppeteer');

export const scrapeEbay = async (url: string) => {
  let ebayUrl = `https://www.ebay.com/`;
  let ebayUrlWithSearch = `https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=${url}&_sacat=0`;
  console.log(`Searching @Ebay, url: ${ebayUrlWithSearch}...`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(ebayUrl);
  await page.type('#gh-ac', `${url}`);
  await page.click('.gh-spr');
  await page.waitFor(2500);
  // await page.screenshot({ path: 'example2.jpg' });
  const ebayImages = await page.$$eval(
    '.s-item__image-wrapper',
    (ebayImages: any[]) =>
      ebayImages.splice(0, 20).map(
        (
          inner: {
            querySelector: (arg0: string) => {
              (): any;
              new (): any;
              getAttribute: { (arg0: string): any; new (): any };
            };
          },
          i: any,
        ) => inner.querySelector('img').getAttribute('src'),
      ),
  );
  const lineDesc = await page.$$eval('.s-item__title', (desc: any[]) =>
    desc.splice(0, 20).map((inr: { innerText: any }, i: any) => inr.innerText),
  );
  const linePrice = await page.$$eval('.s-item__price', (desc: any[]) =>
    desc.map((inr: { innerText: any }, i: any) => inr.innerText),
  );
  // let parsePrice = linePrice.map((el: string) => parseInt(el));
  const response = {
    images: ebayImages,
    descriptions: lineDesc,
    prices: linePrice,
  };
  browser.close();
  return response;
};

// export const scrapeAmazon = async(origin, url) => {
//   let combine;

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(origin);

//   //input field and search button
//   await page.type('#twotabsearchtextbox', `${url}`);
//   await page.click('.nav-input');
//   await page.screenshot({ path: 'example.png' });

//   const element = await page.$('.aok-relative.s-image-fixed-height');

//   if (element === null) {
//     console.log('THis is From element');

//     //get images
//     const lineEl = await page.$$eval('.s-image-square-aspect', innerText =>
//       innerText
//         .splice(0, 6)
//         .map((inr, i) => inr.querySelector('img').getAttribute('src')),
//     );

//     //get description
//     const lineDesc = await page.$$eval(
//       '.a-size-base-plus.a-color-base.a-text-normal',
//       desc => desc.splice(0, 6).map((inr, i) => inr.innerText),
//     );

//     //get price
//     const linePrice = await page.$$eval('.a-price-whole', desc =>
//       desc.map((inr, i) => inr.innerText),
//     );
//     let parsePrice = linePrice.map(el => parseInt(el));

//     console.log(parsePrice);
//     console.log(lineEl);
//     console.log(lineDesc);

//     const dup = new Set(lineDesc);
//     const dupArray = Array.from(dup);
//     console.log(dupArray, 'first IF');

//     combine = [lineEl, dupArray, parsePrice];

//     //Save in DB
//     //amazonToDb(combine)

//     browser.close();
//   } else {
//     //get images
//     const innerText = await page.$$eval(
//       '.aok-relative.s-image-fixed-height',
//       innerText =>
//         innerText
//           .splice(0, 6)
//           .map((inr, i) => inr.querySelector('img').getAttribute('src')),
//     );

//     //Descriptions pics
//     const desc = await page.$$eval(
//       '.a-size-medium.a-color-base.a-text-normal',
//       desc => desc.splice(0, 6).map((inr, i) => inr.innerText),
//     );

//     //get price
//     const linePrice = await page.$$eval('.a-price-whole', desc =>
//       desc.splice(0, 6).map((inr, i) => inr.innerText),
//     );

//     let parsePrice = await linePrice.map(el => parseInt(el));
//     console.log(parsePrice);

//     const dup = new Set(desc);
//     const dupArray = Array.from(dup);
//     console.log(dupArray, 'Else');

//     combine = [innerText, dupArray, parsePrice];
//     //amazonToDb(combine)

//     browser.close();
//   }

//   return combine;
// }
