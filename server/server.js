const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
const MONGO_URI =
    'mongodb://mhmdhasan:d06CjVR4qRdMZVEu@ac-8w2g5t6-shard-00-00.g6ilvnf.mongodb.net:27017,ac-8w2g5t6-shard-00-01.g6ilvnf.mongodb.net:27017,ac-8w2g5t6-shard-00-02.g6ilvnf.mongodb.net:27017/mgmt_db?ssl=true&replicaSet=atlas-14eh0n-shard-0&authSource=admin&retryWrites=true&w=majority';
if (!MONGO_URI) {
    throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', (error) => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use(
    '/graphql',
    expressGraphQL({
        schema,
        graphiql: true,
    })
);

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
