const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()

  .post('/', (req, res, next) => {
    Actor
      .create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })

  .get('/', (rec, res, next) => {
    Actor
      .find()
      .select({ name: true })
      .then(actors => res.send(actors))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .populate('films', 'title released')
      .then(actor => res.send(actor))
      .catch(next);
  });

