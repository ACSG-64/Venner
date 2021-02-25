const {
  id_query_document,
  query_document,
} = require('../../controllers/index');
const express = require('express');
const router = express.Router();



router.get('/query/:country/:state/:city/:borough', function (req, res) {
  let params = {
    country: req.params.country,
    state: req.params.state,
    city: req.params.city,
    borough: req.params.borough
  }

  query_document(params)
    .then(data => {
      ((data !== false) ? res.status(200).send(data).end() : res.status(202).end() )
    })
    .catch((err) => res.status(404).send(err).end())
});

router.get('/query_id/:doc_id', function (req, res) {

  id_query_document(req.params.df_id)
    .then(data => res.status(200).send(data).end())
    .catch((err) => res.status(404).send(err).end())
});

module.exports = router