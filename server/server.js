import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from './config/config';
import routes from './routes';

dotenv.config();

if (process.env.NODE_ENV === 'test') {
  mongoose.connect(config.test);
} else {
  mongoose.connect(config.db);
}

const app = express();
const port = process.env.PORT || 3000;
app.set('port', port);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('Welcome to Population Management System');
})

app.listen(port, () => console.log(`App is running on port ${port}`));
app.use(express.static('server/'));

export default app;
