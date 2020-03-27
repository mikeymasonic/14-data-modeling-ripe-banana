const { getFilm, getFilms, getStudio, getActor } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('film routes', () => {

  it('creates a film', async() => {
    const myActor = await getActor();
    const myStudio = await getStudio();
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'Budge',
        studio: myStudio._id,
        released: 2019,
        cast: [{ role: 'Budge the bird', actor: myActor._id }]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          __v: 0,
          cast: [{ _id: expect.any(String), actor: myActor._id.toString(),
            role: 'Budge the bird' }],
          released: 2019,
          title: 'Budge',
          studio: myStudio._id.toString()
        });
      });
  });

  it('gets all films', async() => {
    const films = await getFilms();
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        films.forEach(film => {
          delete film.cast;
          expect(res.body).toContainEqual({ ...film, studio: expect.any(Object) });
        });
      });
  });
});
