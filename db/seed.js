const chance = require('chance').Chance();

const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');
const Reviewer = require('../lib/models/Reviewer');
const Review = require('../lib/models/Review');

module.exports = async({ studiosNum = 2, filmsNum = 2, actorsNum = 2, reviewersNum = 2, reviewsNum = 200 } = {}) => {
  const actors = await Actor.create([...Array(actorsNum)].map(() => ({
    name: chance.name()
  })));

  const studios = await Studio.create([...Array(studiosNum)].map(() => ({
    name: chance.prefix() + ' ' + chance.animal() + ' Studios',
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const reviewers = await Reviewer.create([...Array(reviewersNum)].map(() => ({
    name: chance.name(),
    company: chance.animal() + ' ' + chance.last()
  })));

  const films = await Film.create([...Array(filmsNum)].map(() => ({
    title: chance.first() + ' the ' + chance.animal() + ': ' + chance.profession(),
    studio: chance.pickone(studios.map(studio => studio._id)),
    released: chance.integer({ min: 1888, max: 3000 }),
    cast: [{ role: chance.word(), actor: chance.pickone(actors.map(actor => actor._id)) }]
  })));

  await Review.create([...Array(reviewsNum)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    reviewer: chance.pickone(reviewers.map(reviewer => reviewer._id)),
    review: chance.string({ length: 140 }),
    film: chance.pickone(films.map(film => film._id))
  })));


};
