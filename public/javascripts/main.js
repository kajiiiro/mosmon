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

mosmon.topics = {};

mosmon.createHtml = function(item) {
  var date = new Date(item.date).toISOString();
  return (
      '<div class="mosmon_topic">'   + item.topic   + '</div>'
    + '<div class="mosmon_message">' + item.message + '</div>'
    + '<div class="mosmon_date">'    + date         + '</div>'
  );
};

mosmon.addMosData = function(item) {
  // remove $SYS
  var key = item.topic.split('/').slice(1).join('_');
  if (!mosmon.topics[key]) {
    mosmon.topics[key] = item;
    $('#main').prepend('<div class="mosmon_item" id="' + key + '">'
      + mosmon.createHtml(item) + '</div>'
    );
    return;
  }
  mosmon.topics[key] = item;
  $('#' + key).html(mosmon.createHtml(item));
};

$(function() {
  setInterval(mosmon.monitor, 3000);
});
