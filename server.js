var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8000;
var router = express.Router();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function(req, res, next) {
  // log request
  var requestProperties = [(new Date()).toJSON(), req.method, req.originalUrl,
                           'Headers: ' + JSON.stringify(req.headers),
                           'Query: ' + JSON.stringify(req.query),
                           'Body: ' + JSON.stringify(req.body || {})];
  var logLine = requestProperties.join(' | ');
  console.log(logLine);
  next();
});

router.get(/^(.*)$/, function(req, res) {
  res.status(200).send();
});

router.post(/^(.*)$/, function(req, res) {
  res.status(200).json({"status": "success"});
});

app.use(router);
app.listen(port);
console.log('Server listening on port: ' + port);
