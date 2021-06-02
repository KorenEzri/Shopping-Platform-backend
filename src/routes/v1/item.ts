import { Router, Response, Request } from 'express';
import * as item from '../../utils/item.util';
require('dotenv').config();
const itemRouter = Router();

itemRouter.get('/:query', async (req: Request, res: Response) => {
  const { query } = req.params;
  try {
    const databaseRes = await item.getItemsFromDB(query);
    if (databaseRes.status === 1) {
      return res.status(200).send(databaseRes.data);
    } else if (databaseRes.status === 3) {
      const scraperRes = await item.getItemsFromScraper(query);
      if (scraperRes === 2) return res.status(500).send('ERROR');
      if (scraperRes.status === 1) {
        res.status(200).send(scraperRes.data);
      }
    }
  } catch ({ message }) {
    console.log(message);
    res.status(500).send(message);
  }
});
itemRouter.post('/create', (req: Request, res: Response) => {});

itemRouter.post('/delete', (req: Request, res: Response) => {});

itemRouter.post('/update', (req: Request, res: Response) => {});

export default itemRouter;
