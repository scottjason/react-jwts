const User = require('../models/user')
const async = require('async')
const bcrypt = require('bcrypt-nodejs')

function comparePassword(entered, existing, cb) {
  bcrypt.compare(entered, existing, (err, isMatch) => { cb(err, isMatch) })
}

module.exports = (app) => {
  app.post('/login', login)
  app.post('/signup', signup)
  app.get('*', (req, res) => res.redirect('/'))
}

function login(req, res, next) {
  async.waterfall([
    (cb) => {
      User.findOne({ email: req.body.email }).exec(cb)
    },
    (user, cb) => {
      if (!user) {
        res.status(401).send({ message: 'email not found' })
      } else {
        comparePassword(req.body.password, user.password, (err, isMatch) => {
          if (err) return cb(err)
          if (!isMatch) return res.status(401).send({ message: 'right email, wrong password' })
          cb(null, user)
        })
      }
    },
  ], (err, user) => {
    delete user.password
    res.status(200).send({ user: user })
  })
}

function signup(req, res, next) {
  async.waterfall([
    (cb) => {
      User.findOne({ email: req.body.email }).exec(cb)
    },
    (user, cb) => {
      if (user) return res.status(401).send({ message: 'existing user' })
      var user = new User()
      user.email = req.body.email
      user.password = req.body.password
      user.save(cb)
    },
  ], (err, user) => {
    delete user.password
    res.status(200).send({ user: user })
  })
}
