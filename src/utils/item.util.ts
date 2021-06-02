import { scrapeEbay } from '../utils';
import { Search } from '../db/schemas/item';

enum QueryResponses {
  SUCCESS = 1,
  ERROR,
  NOT_FOUND,
  INCORRECT_INPUT,
}

export const getItemsFromDB = async (query: string) => {
  try {
    const queryFound = await Search.findOne({ title: query });
    if (!queryFound)
      return {
        status: QueryResponses.NOT_FOUND,
        data: queryFound,
      };
    else
      return {
        status: QueryResponses.SUCCESS,
        data: queryFound,
      };
  } catch ({ message }) {
    console.log('Error at getItemsFromDB() at item.util.ts at ~line 9');
    return {
      status: QueryResponses.ERROR,
      data: message,
    };
  }
};
export const getItemsFromScraper = async (query: string) => {
  try {
    const scraperRes = await scrapeEbay(query);
    if (!scraperRes) return QueryResponses.ERROR;
    try {
      const search = new Search({
        title: query,
        descriptions: scraperRes.descriptions,
        prices: scraperRes.prices,
        images: scraperRes.images,
      });
      await search.save();
    } catch ({ message }) {
      console.log('message');
    }
    return {
      status: QueryResponses.SUCCESS,
      data: scraperRes,
    };
  } catch ({ message }) {
    console.log('Error at getItemsFromScraper() at item.util.ts at ~line 19');
    return {
      status: QueryResponses.ERROR,
      data: message,
    };
  }
};
