var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.NODE_ENV || 'development']);

router.get('/api/v1/posts', function(req, res, next) {
  knex('posts')
  .then(function (posts) {
    console.log(posts);
    res.json(posts);
  })
});

router.get('/api/v1/posts/comments', function(req, res, next){
  knex('comments')
  .then(function (comments) {
    console.log(comments);
    res.json(comments);
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

router.post('/api/v1/posts/upvote', function(req, res, next) {
  knex('posts')
  .where({id: req.body.id})
  .update({score: req.body.score+1})
  .returning('*')
  .then(function(post){
    res.json(post);
  })
});

router.post('/api/v1/posts/downvote', function(req, res, next) {
  knex('posts')
  .where({id: req.body.id})
  .update({score: req.body.score-1})
  .returning('*')
  .then(function(post){
    res.json(post);
  })
});

module.exports = router;
