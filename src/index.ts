import { ListBucketsCommand } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
import express from 'express';

import {s3, uploadTest} from './lib';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  // debugger
  // console.log(s3, '<<<');

  // // Call an S3 API using the LocalStack endpoint
  // s3.send(new ListBucketsCommand({}))
  //   .then((data) => {
  //     console.log(333)
  //     console.log(data)
  //   })
  //   .catch((error) => {
  //     console.log("55555")
  //     console.error(error)
  //   });
  await  uploadTest()

  res.send('Hello Index!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
