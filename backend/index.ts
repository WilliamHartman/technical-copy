import bodyParser from 'body-parser';
import cors from 'cors';
import { mapShipments } from './mapping/mapShipments';
import express from 'express';
import { config as queryConfig } from './database/dbConfig';

const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
