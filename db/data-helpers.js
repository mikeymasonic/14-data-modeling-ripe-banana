require('dotenv').config();
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');


beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = doc => JSON.parse(JSON.stringify(doc));

const createGetters = Model => {
  const modelName = Model.modelName;

  return {
    [`get${modelName}`]: (query) => Model.findOne(query).then(prepare),
    [`get${modelName}s`]: () => Model.find().then(docs => docs.map(prepare))
  };
};

module.exports = {
  ...createGetters(Studio)
};
