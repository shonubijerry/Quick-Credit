/* eslint-disable no-console */
import Express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './server/routes';

/**
* @fileOverview - application entry point
* @requires - express
* @requires - body-parser
* @requires - dotenv
* @requires - cors
* @requires - ./server/routes
* @exports - app.js
* */

dotenv.config();

// declare constants
const app = new Express();
const port = process.env.PORT;

// declare middleware
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use('/api/v1/api-docs', Express.static('docs.api.md'));

routes(app);

// listen to app port
app.listen(port, () => console.log(`App listening on port ${port}`));

export default app;
