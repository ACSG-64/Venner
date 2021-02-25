const {
  create_report,
  get_reports,
  get_report_by_id,
  remove_report,
} = require('../../controllers/index');
const express = require('express');
const router = express.Router();

router.get('/retreive_reps/:user_id', function (req, res) {

  get_reports(req.params.user_id)
    .then(reports => {
      ((reports !== false) ? res.status(200).send(reports).end() : res.status(204).end() )
    })
    .catch((err) => res.status(404).send(err).end())
});

router.get('/retreive_rep/:user_id/:df_id', function (req, res) {

  get_reports(req.params.user_id, req.params.df_id)
    .then(report => res.status(200).send(report).end() )
    .catch((err) => res.status(404).send(err).end())
});

router.get('/create_rep/:df_id/:user_id', function (req, res) {

  create_report(req.params.user_id, req.params.df_id)
    .then(report => {
      res.status(200).send(report).end();
    })
    .catch((err) => res.status(404).send(err).end())
});

router.put('/delete_rep/:df_id/:user_id', function (req, res) {

  remove_report(req.params.user_id, req.params.df_id)
    .then(report => {
      res.status(200).send(report).end();
    })
    .catch((err) => res.status(404).send(err).end())
});

module.exports = router