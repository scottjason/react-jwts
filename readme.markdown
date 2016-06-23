### WIP

#### Installation

`git clone https://github.com/scottjason/react-redux-authentication.git && cd react-redux-authentication`

create the `env.js` file in the root dir:

`touch env.js`

copy and past the below into the `env.js` file and replace the mongo uri with your own:

```javascript
var env = {}
env.mongoUri = 'your-mongo-uri'
env.jwtSecret = 'your-jwt-secret'
module.exports = env
```

then:

`nvm use 5.2`

`npm i`

#### Usage

`npm start`

point your browser to localhost:3000