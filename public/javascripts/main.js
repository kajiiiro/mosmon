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
      '<span class="mosmon_topic">'   + item.topic   + '</span>'
    + ' : '
    + '<span class="mosmon_message">' + item.message + '</span>'
    + '<span class="mosmon_date">'    + date         + '</span>'
  );
};

mosmon.addMosData = function(item) {
  var hash = CryptoJS.SHA256(item.topic);
  if (!mosmon.topics[hash]) {
    mosmon.topics[hash] = item;
    $('#main').prepend('<p id="' + hash + '">'
      + mosmon.createHtml(item) + '</p>'
    );
    return;
  }
  mosmon.topics[hash] = item;
  $('#' + hash).html(mosmon.createHtml(item));
};

$(function() {
  setInterval(mosmon.monitor, 3000);
});
