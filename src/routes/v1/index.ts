import { Request, Response, Router } from 'express';
import { checkToken } from '../../middelwares/checkToken';
import authRouter from './auth';
import itemRouter from './item';

const router = Router();

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

router.use(authRouter);
router.use('/item', itemRouter);
router.use(checkToken);

router.use(unknownEndpoint);
export default router;
