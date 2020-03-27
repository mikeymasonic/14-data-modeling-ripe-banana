const chance = require('chance').Chance();

const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');
const Actor = require('../lib/models/Actor');

module.exports = async({ studiosNum = 2, filmsNum = 2, actorsNum = 2 } = {}) => {
  const actors = await Actor.create([...Array(actorsNum)].map(() => ({
    name: chance.name()
  })));

  const studios = await Studio.create([...Array(studiosNum)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const films = await Film.create([...Array(filmsNum)].map(() => ({
    title: chance.name(),
    studio: chance.pickone(studios.map(studio => studio._id)),
    released: chance.integer({ min: 1888, max: 3000 }),
    cast: [{ role: chance.word(), actor: chance.pickone(actors.map(actor => actor._id)) }]
  })));


};
