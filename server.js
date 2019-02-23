import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import routes from './server/routes';


const app = express();
const port = process.env.PORT || 3000;
app.use(routes);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to Population Management System');
})

app.listen(port, () => console.log(`App is running on port ${port}`));

export default app;
