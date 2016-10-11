var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'mosmon' });
});

var mqtt = require('mqtt');
var options = {
  clientId: 'mosmon',
};
var client = mqtt.connect('mqtt://localhost', options);
client.on('connect', function() {
  console.log('mqtt connect');
  client.subscribe('$SYS/#', function(error) {
    console.log('mqtt subscribe', error);
  });
});
client.on('close', function() {
  console.log('mqtt close');
});
client.on('error', function(error) {
  console.error('mqtt error', error);
});
var messages = [];
client.on('message', function(topic, message) {
  if (Buffer.isBuffer(message)) {
    message = message.toString();
  }
  messages.push({topic: topic, message: message});
});

router.get('/mqtt', function(req, res, next) {
  var limit = Math.min(30, messages.length); // 一回で取得できる数を最大30に制限する
  var _messages = messages.slice(0, 30);
  for (var i = 0;i < limit;++i) {
    message.shift();
  }
  res.json(_messages);
});

module.exports = router;
