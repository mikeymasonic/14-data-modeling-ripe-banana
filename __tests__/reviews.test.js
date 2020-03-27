const { getReview, getFilm, getReviewer } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const chance = require('chance').Chance();
const Review = require('../lib/models/Review');

describe('review routes', () => {

  it('creates a review', async() => {
    const reviewer = await getReviewer();
    const film = await getFilm();
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 1,
        reviewer: reviewer._id,
        review: 'Why were we subjected to this monstrosity?  Would give zero rating if this stupid site let me.',
        film: film._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 1,
          reviewer: reviewer._id.toString(),
          review: 'Why were we subjected to this monstrosity?  Would give zero rating if this stupid site let me.',
          film: film._id.toString(),
          __v: 0
        });
      });
  });
});
