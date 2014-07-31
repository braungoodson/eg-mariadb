var express = require('express'),
  mariasql = require('mariasql'),
  maria = new mariasql(),
  server = express(),
  port = process.env.PORT || 30000,
  staticRoot = __dirname;

maria
  .connect({
    host: 'localhost',
    user: 'root',
    password: 'root',
    db: 'mysql'
  })
;

maria
  .on('connect', function() {
    console.log('connected to maria');
  }).on('error', function(e) {
    console.log('error: maria: ' + e);
  }).on('close', function(c) {
    console.log('warning: maria: closed: ' + c);
  })
;

server.use('/', express.static(staticRoot));
server.listen(port);
console.log('http://localhost:'+port);
var results = [];
  maria
    .query('select user, host, password from user;')
    .on('result',onResultHandler)
    .on('end',onEndHandler)
  ;
  function onResultHandler (result) {
    result
      .on('row',onRowHandler)
      .on('error',onErrorHandler)
      .on('end',onEndHandler)
    ;
    function onRowHandler (row) {
      console.log(row);
  results.push(row);
    }
    function onErrorHandler (error) {
      console.log(error);
    }
    function onEndHandler (end) {
      console.log(end);
    }
  }
  function onEndHandler (end) {
    console.log('end',end);
  console.log(results);
  }