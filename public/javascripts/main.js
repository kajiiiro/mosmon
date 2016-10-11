$(function() {
  var ws = null;
  var open = function() {
    if (ws === null) {
      // ws = new WebSocket('ws://' + location.host + '/ws/echo', ['echo-protocol']);
      ws = new WebSocket('ws://' + location.hostname + '/ws/echo', ['echo-protocol']);
      ws.onopen = function(event) {
        console.log(event);
        var date = new Date.toISOString();
        ws.send(date);
        $('#main').prepend('<p>open!! ' + date + '</p>');
      };
      ws.onmessage = function(event) {
        console.log(event);
        $('#main').prepend('<p>message!!</p>');
      };
      ws.onerror = function(event) {
        console.log(event);
        $('#main').prepend('<p>error!!</p>');
      };
      ws.onclose = function(event) {
        console.log(event);
        $('#main').prepend('<p>close!!</p>');
      };
    }
  };
  open();
});
