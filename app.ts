import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import routes from './src/routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api', routes);

export default app;
