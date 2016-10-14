var mosmon = mosmon || {};

mosmon.generateKey = function(topic) {
  // remove $SYS
  var key = topic.split('/').slice(1).join('_');
  // trim space
  key = key.split(' ').join('');
  return key;
};

mosmon.createHtml = function(item) {
  var date    = item.date    ? new Date(item.date).toISOString() : '';
  var message = item.message ? item.message                      : '';
  return (
      // topicは必須
      '<div class="mosmon_topic">'   + item.topic + '</div>'
    + '<div class="mosmon_message">' + message    + '</div>'
    + '<div class="mosmon_date">'    + date       + '</div>'
  );
};

mosmon.newItem = function(key, item) {
  mosmon.topics[key] = true;
  $('#main').prepend('<div class="mosmon_item" id="' + key + '">'
    + mosmon.createHtml(item)
    + '</div><br />'
  );
};

mosmon.addMosData = function(item) {
  var key = mosmon.generateKey(item.topic);
  if (!mosmon.topics[key]) {
    // 既知のtopic以外の処理
    mosmon.newItem(key, item);
    return;
  }
  $('#' + key).html(mosmon.createHtml(item));
};

mosmon.monitor = function() {
  $.ajax({
    type    : 'GET',
    url     : '/mqtt',
    dataType: 'json',
    success : function(json) {
      json.forEach(function(item) {
        mosmon.addMosData(item);
      });
    }
  });
};

mosmon.topics = {};

mosmon.initTopic = function() {
  [
    '$SYS/broker/bytes/received',
    '$SYS/broker/bytes/sent',
    '$SYS/broker/clients/active ',
    '$SYS/broker/clients/connected',
    '$SYS/broker/clients/disconnected',
    '$SYS/broker/clients/expired',
    '$SYS/broker/clients/inactive ',
    '$SYS/broker/clients/maximum',
    '$SYS/broker/clients/total',
    '$SYS/broker/heap/current',
    '$SYS/broker/heap/maximum',
    '$SYS/broker/load/bytes/received/1min',
    '$SYS/broker/load/bytes/received/5min',
    '$SYS/broker/load/bytes/received/15min',
    '$SYS/broker/load/bytes/sent/1min',
    '$SYS/broker/load/bytes/sent/5min',
    '$SYS/broker/load/bytes/sent/15min',
    '$SYS/broker/load/connections/1min',
    '$SYS/broker/load/connections/5min',
    '$SYS/broker/load/connections/15min',
    '$SYS/broker/load/messages/received/1min',
    '$SYS/broker/load/messages/received/5min',
    '$SYS/broker/load/messages/received/15min',
    '$SYS/broker/load/messages/sent/1min',
    '$SYS/broker/load/messages/sent/5min',
    '$SYS/broker/load/messages/sent/15min',
    '$SYS/broker/load/publish/dropped/1min',
    '$SYS/broker/load/publish/dropped/5min',
    '$SYS/broker/load/publish/dropped/15min',
    '$SYS/broker/load/publish/received/1min',
    '$SYS/broker/load/publish/received/5min',
    '$SYS/broker/load/publish/received/15min',
    '$SYS/broker/load/publish/sent/1min',
    '$SYS/broker/load/publish/sent/5min',
    '$SYS/broker/load/publish/sent/15min',
    '$SYS/broker/load/sockets/1min',
    '$SYS/broker/load/sockets/5min',
    '$SYS/broker/load/sockets/15min',
    '$SYS/broker/messages/inflight',
    '$SYS/broker/messages/received',
    '$SYS/broker/messages/sent',
    '$SYS/broker/messages/stored',
    '$SYS/broker/publish/bytes/received',
    '$SYS/broker/publish/bytes/sent',
    '$SYS/broker/publish/messages/dropped',
    '$SYS/broker/publish/messages/received',
    '$SYS/broker/publish/messages/sent',
    '$SYS/broker/retained messages/count',
    '$SYS/broker/subscriptions/count',
    '$SYS/broker/timestamp',
    '$SYS/broker/uptime',
    '$SYS/broker/version',
  ].forEach((topic) => {
    mosmon.newItem(mosmon.generateKey(topic), {topic: topic});
  });
};

$(function() {
  mosmon.initTopic();
  setTimeout(mosmon.monitor, 500);
  setInterval(mosmon.monitor, 3000);
});
