import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './src/routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(path.resolve(), 'client/build')));

app.use('/images', express.static(path.resolve(__dirname, 'src','database', 'images')));

app.use(routes);

app.listen(port);
