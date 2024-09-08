// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
require('typescript-require');

const { addMailToCache, startMailTimer } = require('./services/mail.ts');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/client/build'));

app.post('/', async (request, response) => {
  const { userid, wish, address } = request.body;

  addMailToCache({ username: userid, wish, address });
  response.json({ redirect: 'http://localhost:3000/success' });
});

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

app.get('/success', (request, response) => {
  response.sendFile(__dirname + '/views/sent.html');
});


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  startMailTimer();
});
