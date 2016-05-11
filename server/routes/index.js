var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV || 'development']);

router.get('/api/v1/posts', function(req, res, next) {
  knex('posts').then(function (posts) {
    console.log(posts);
    res.json(posts);
  })
});

router.post('/api/v1/posts', function(req, res, next) {
  var data = {
    title: req.body.title,
    author: req.body.author,
    image: req.body.image,
    description: req.body.description
  }
  knex('posts').insert(data).returning('*').then(function(posts){
    console.log(posts);
    res.json(posts[0]);
  })
});

module.exports = router;
