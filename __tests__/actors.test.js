const { getActor, getActors } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('actor routes', () => {
  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'A Budge Runs Through It'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'A Budge Runs Through It',
          id: expect.any(String)
        });
      });
  });

});
