const chance = require('chance').Chance();

const Studio = require('../lib/models/Studio');

module.exports = async({ studiosNum = 2 } = {}) => {

  const studios = await Studio.create([...Array(studiosNum)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

};
