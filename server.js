import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import config from './server/config/config';
import 'dotenv';
import routes from './server/routes';

// data base connection
mongoose.connect(config.db);
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Connection error: ', err);
});

db.once('open', () => {
  console.log('Database connection successful');
});


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
