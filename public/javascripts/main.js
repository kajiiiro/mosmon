var monitor = function() {
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

$(function() {
  setInterval(monitor, 3000);
});
