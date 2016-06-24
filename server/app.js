const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.js')

const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())

require('mongoose').connect(process.env.MONGODB_URI || require('../env').mongoUri, () => {
  console.log('Database Connected')
})

if (isDev) {
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

  app.get('/', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')))
    res.end()
  })
} else {
  app.use(express.static(__dirname + '../dist'))
  app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))
}

exports.isDev = isDev
exports.middleware = middleware

require('./routes')(app)
app.listen(port, () => console.log('Listening on port', port))
