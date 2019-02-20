var express = require('express'),
    app = express(),
    port = process.env.PORT || 3040,
    bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

var accountRoute = require('./routes/accountRoute');
accountRoute(app);

var transactionRoute = require('./routes/transactionRoute');
transactionRoute(app);
app.listen(port);

console.log('RESTful API server started on: ' + port);