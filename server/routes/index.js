var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV || 'development']);

router.get('/api/v1/posts', function(req, res, next) {
  knex('posts').then(function (posts) {
    console.log(posts);
    res.json(posts);
  })
});

module.exports = router;
