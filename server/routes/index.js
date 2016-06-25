const User = require('../models/user')
const async = require('async')
const bcrypt = require('bcrypt-nodejs')
const path = require('path')
const jwt = require('jsonwebtoken')
const secret = process.env.jwtSecret || require('../../env').jwtSecret
const middleware = require('../app').middleware
const isDev = require('../app').isDev

module.exports = (app) => {
  app.post('/login', login)
  app.post('/signup', signup)
  app.get('/dashboard/:token', dashboard)
  app.get('*', (req, res) => res.redirect('/'))
}

function isAuthenticated(token, cb) {
  jwt.verify(token, secret, (err, decoded) => cb(err))
}

function comparePassword(entered, existing, cb) {
  bcrypt.compare(entered, existing, (err, isMatch) => cb(err, isMatch))
}

function dashboard(req, res, next) {
  isAuthenticated(req.params.token, (err, decoded) => {
    if (err) return res.redirect('/')
    if (isDev) {
      res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../../dist/index.html')))
      res.end()
    } else {
      res.sendFile(path.join(__dirname, '../../dist/index.html'))
    }
  })
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
    user = user.toJSON()
    delete user.password
    user.token = jwt.sign(user, secret, { expiresIn: '24h' })
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
    user = user.toJSON()
    delete user.password
    user.token = jwt.sign(user, secret, { expiresIn: '24h' })
    res.status(200).send({ user: user })
  })
}
