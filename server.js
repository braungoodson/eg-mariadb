var express = require('express'),
  mariasql = require('mariasql'),
  maria = new mariasql(),
  server = express(),
  port = process.env.PORT || 30000,
  staticRoot = __dirname;

maria
  .connect({
    host: '54.187.172.251',
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
