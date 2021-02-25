const {get_dataframe} = require('../../controllers/index');
const express = require('express');
const router = express.Router();

router.get('/data/query/:country/:state/:city/:borough', function (req, res) {
  let params = {
    country: req.params.country,
    state: req.params.state,
    city: req.params.city,
    borough: req.params.borough
  }

  get_dataframe(params)
    .then(data => {
      ((data !== false) ? res.status(200).send(data).end() : res.status(202).end() )
    })
    .catch((err) => res.status(404).send(err).end())
});

module.exports = router