var mosmon = mosmon || {};

mosmon.topics = mosmon.topics || {};

mosmon.initTopic = function() {
  // TODO 既知のtopicリストをループして回す
  // var key = mosmon.generateKey(item.topic);
  // mosmon.topics[key] = true;
  // $('#main').prepend('<div class="mosmon_item" id="' + key + '">'
  //   + '<div class="mosmon_topic">'   + item.topic   + '</div></div><br />'
  // );
};

$(function() {
  mosmon.initTopic();
});
