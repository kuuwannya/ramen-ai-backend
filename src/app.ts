import express, { Application, Request, Response } from 'express';
import itemRoutes from './routes/items';

const app: Application = express();

app.use(express.json());

// ルートの設定
app.use('/api/items', itemRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
