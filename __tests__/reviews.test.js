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

  it('gets 100 reviews if there are more than 100', async() => {
    const reviewer = await getReviewer();
    const film = await getFilm();

    await Review.create([...Array(150)].map(() => ({
      rating: 5,
      reviewer: reviewer._id,
      review: chance.string({ length: 140 }),
      film: film._id
    })));
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toHaveLength(100);
      });
  });

  it('deletes a review by id', async() => {
    const review = await getReview();
    return request(app)
      .delete(`/api/v1/reviews/${review._id}`)
      .then(res => {
        expect(res.body).toEqual(review);
      });
  });
});
