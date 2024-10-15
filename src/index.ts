import 'express-async-errors';
import express, { json, Request, Response, NextFunction } from 'express';
import routes from './routes';
import env from './configuration/env';
import cookieParser from 'cookie-parser';
import { errors } from './middleware';

const app = express();

app.use(json());
app.use(cookieParser());
app.use('/api', routes);
app.use(errors);

const PORT = env.port || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}.`);
});
