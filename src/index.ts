import * as dotenv from 'dotenv';
import express from 'express';

import { s3, uploadTest } from './lib';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  // debugger

  await uploadTest();

  res.send('Hello Index!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
