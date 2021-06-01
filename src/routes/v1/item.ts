import { Router, Response, Request } from 'express';

require('dotenv').config();

const itemRouter = Router();
itemRouter.get('/test', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

itemRouter.get('/all', (req: Request, res: Response) => {});

itemRouter.post('/create', (req: Request, res: Response) => {});

itemRouter.post('/delete', (req: Request, res: Response) => {});

itemRouter.post('/update', (req: Request, res: Response) => {});

export default itemRouter;
