require('dotenv').config();
const express = require('express');
const router = express.Router();
const knex = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

router.get('/me', function (req, res, next) {
  console.log('HIT IN ROUTER');
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    // IF it was expired - verify would actually throw an exception
    // we'd have to catch in a try/catch
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // payload is {id: 56}
    knex('users').where({id: payload.id}).first().then(function (user) {
      if (user) {
        res.json({id: user.id, name: user.name})
      } else {
        res.status(403).json({
          error: "Invalid ID"
        })
      }
    })
  } else {
    res.status(403).json({
      error: "No token"
    })
  }
})

router.post('/login', function (req, res, next) {
  const errors = [];

  if (!req.body.email || !req.body.email.trim()) errors.push("Please enter an email");
  if (!req.body.password || !req.body.password.trim()) errors.push("Please enter a password");

  if (errors.length) {
    res.status(422).json({
      errors: errors
    })
  } else {
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
            username: user.username,
            token: token
          })
        }
      } else {
        res.status(422).json({
          errors: ["Invalid email"]
        })
      }
    })
  }

})

router.post('/', function(req, res, next) {
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

module.exports = router;
