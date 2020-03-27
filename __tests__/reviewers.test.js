const { getReviewer, getReviewers, getReview } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('reviewer routes', () => {

  it('creates a reviewer', async() => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Maxwell Reviewman', company: 'Final Word Reviews'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Maxwell Reviewman',
          company: 'Final Word Reviews',
          // id: expect.any(String),
          __v: 0
        });
      });
  });
});
