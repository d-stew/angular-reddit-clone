require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

router.post('/api/v1/users/login', function (req, res, next) {
  console.log('hit server B', req.body);
  // const errors = [];
  //
  // if (!req.body.email || !req.body.email.trim()) errors.push("Please enter an email");
  // // if (!req.body.password || !req.body.password.trim()) errors.push("Please enter a password");
  //
  // if (errors.length) {
  //   res.status(422).json({
  //     errors: errors
  //   })
  // } else {
    return knex('users')
    .whereRaw('lower(email) = ?', req.body.email.toLowerCase())
    .first()
    .then(function (result) {
      if (result) {
        var validPassword = bcrypt.compareSync(req.body.password, result.password)
        if (validPassword) {
          console.log(result);
          const user = result;
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
          res.json({
            id: user.id,
            email: user.email,
            name: user.name,
            token: token
          })
        }
      } else {
        res.status(422).json({
          errors: ["Invalid email"]
        })
      }
    })
  // }

})

router.post('/api/v1/users', function(req, res, next) {
  const errors = [];

  if (!req.body.email || !req.body.email.trim()) errors.push("Email can't be blank");
  if (!req.body.username || !req.body.username.trim()) errors.push("Name can't be blank");
  if (!req.body.password || !req.body.password.trim()) errors.push("Password can't be blank");
  if (req.body.password !== req.body.confirmPassword) errors.push("Passwords do not match")

  if (errors.length) {
    res.status(422).json({
      errors: errors
    })
  } else {
    knex('users')
    .whereRaw('lower(email) = ?', req.body.email.toLowerCase())
    .count()
    .first()
    .then(function (result) {
      if (result.count === "0") {
        const saltRounds = 4;
        const passwordHash = bcrypt.hashSync(req.body.password, saltRounds);

        knex('users')
        .insert({
          email: req.body.email,
          username: req.body.username,
          password: passwordHash
        })
        .returning('*')
        .then(function (users) {
          const user = users[0];
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

          res.json({
            id: user.id,
            email: user.email,
            username: user.username,
            token: token
          })
        })

      } else {
        res.status(422).json({
          errors: ["Email has already been taken"]
        })
      }

    })
  }
})

router.get('/api/v1/posts', function(req, res, next) {
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

router.post('/api/v1/posts', function(req, res, next) {
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

router.post('/api/v1/posts/comments', function(req, res, next) {
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
