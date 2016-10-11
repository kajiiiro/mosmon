var express = require('express');
var router = express.Router();

router.ws('/echo', function(ws, req) {
  console.log('ws /');
  ws.send('hello world');
  ws.on('open', function() {
    console.log('ws /');
    ws.send('hello world');
  });
  ws.on('message', function(msg) {
    console.log('ws /');
    ws.send(msg);
  });
});

module.exports = router;
