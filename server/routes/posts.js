require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
  const results = {};
  knex('posts')
  .then(function(posts){
    results.posts = posts;
  })
  .then(function () {
    knex('comments')
    .then(function(comments) {
      results.comments = comments;
      for (var i = 0; i < results.posts.length; i++) {
        results.posts[i].comments = [];
        results.posts[i].showComments = false;
        for (var j = 0; j < results.comments.length; j++) {
          if (results.posts[i].id === results.comments[j].post_id) {
            results.posts[i].comments.push(results.comments[j])
          }
        }
      }
      delete results.comments;
      res.json(results);
    })
  })
});

router.post('/', function(req, res, next) {
  const data = {
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

router.post('/comments', function(req, res, next) {
  console.log(req.body);
  const data = {
    post_id: req.body.post_id,
    username: req.body.username,
    comment: req.body.comment
  }
  knex('comments').insert(data).returning('*').then(function(comments){
    console.log(comments);
    res.json(comments[0]);
  })
});

router.post('/upvote', function(req, res, next) {
  knex('posts')
  .where({id: req.body.id})
  .update({score: req.body.score+1})
  .returning('*')
  .then(function(post){
    res.json(post);
  })
});

router.post('/downvote', function(req, res, next) {
  knex('posts')
  .where({id: req.body.id})
  .update({score: req.body.score-1})
  .returning('*')
  .then(function(post){
    res.json(post);
  })
});

module.exports = router;
