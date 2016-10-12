var mosmon = mosmon || {};

mosmon.monitor = function() {
  $.ajax({
    type    : 'GET',
    url     : '/mqtt',
    dataType: 'json',
    success : function(json) {
      json.forEach(function(item) {
        $('#main').prepend('<p><span class="topic">'
          + item.topic + '</span> : <span class="message">'
          + item.message + '</span></p>');
      });
    }
  });
};

mosmon.topics = {};

mosmon.addMosData = function(topic, message) {
  var hash = CryptoJS.SHA256(topic);

};

$(function() {
  setInterval(mosmon.monitor, 3000);
});
