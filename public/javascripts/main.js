var mosmon = mosmon || {};

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

mosmon.topics = mosmon.topics || {};

mosmon.createHtml = function(item) {
  var date = new Date(item.date).toISOString();
  return (
      '<div class="mosmon_topic">'   + item.topic   + '</div>'
    + '<div class="mosmon_message">' + item.message + '</div>'
    + '<div class="mosmon_date">'    + date         + '</div>'
  );
};

mosmon.generateKey = function(topic) {
  // remove $SYS
  var key = topic.split('/').slice(1).join('_');
  // space changed 'SPACE'
  key = key.split(' ').join('SPACE');
  return key;
}

mosmon.addMosData = function(item) {
  var key = mosmon.generateKey(item.topic);
  if (!mosmon.topics[key]) {
    mosmon.topics[key] = true;
    $('#main').prepend('<div class="mosmon_item" id="' + key + '">'
      + mosmon.createHtml(item) + '</div><br />'
    );
    return;
  }
  $('#' + key).html(mosmon.createHtml(item));
};

$(function() {
  setTimeout(mosmon.monitor, 500);
  setInterval(mosmon.monitor, 3000);
});
