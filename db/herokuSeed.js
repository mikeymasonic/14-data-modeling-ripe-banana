require('dotenv').config();
const seed = require('./seed');
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');

connect();
seed({}).then(thing => mongoose.connection.close());
