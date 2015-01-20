var app = {};
app.room = '911Online';
app.server = 'http://127.0.0.1:3000/classes/messages';

app.init = function () {

  app.createDropDown(app.rooms);
  this.fetch(app.room);


  // setInterval( function() {
  //   // app.rooms = app.getRooms();
  //   app.fetch(app.room);
  //   app.createDropDown(app.rooms);
  // }, 500);
};

app.fetch = function (room) {
  $.ajax({
    url: app.server,
    type: 'GET',
    data: {
      // TODO: getting coordinates 
      // order: "-createdAt",
      // where: { "room": room }
    },
    success: function (data) {
      app.messages = data.results;
    },
    complete: app.displayMessages
  });
};


app.send = function (message) {

  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('Successfully added');
    },
    error: function (data) {
      console.log('Unsuccessful');
    },
    complete: function() {
      app.addMessage(message);
    }
  });
};


app.addMessage = function (message) {
  $('#chats').prepend("<li class='list-group-item'>" + "<strong class='username'>" + app.escapeHtml(message.user) + "</strong>: " + app.escapeHtml(message.msg_text)  + "</li>");
};

app.displayMessages = function () {
  app.clearMessages();
  var elements = [];
  for (var i = 0; i < app.messages.length; i++) {
    if (app.messages[i]['user'] !== undefined) {
      if (app.friends.indexOf(app.messages[i]['user']) > -1) {
        elements.push("<li class='list-group-item friend'>" + "<strong class='username'>" + app.escapeHtml(app.messages[i]['user']) + "</strong>: " + app.escapeHtml(app.messages[i]['msg_text']) + "</li>");
      } else {
        elements.push("<li class='list-group-item'>" + "<strong class='username'>" + app.escapeHtml(app.messages[i]['user']) + "</strong>: " + app.escapeHtml(app.messages[i]['msg_text']) + "</li>");
      }
    }
  }
  $('ul#chats').append(elements.join(''));
};

app.createDropDown = function (rooms) {
  $('#roomMenu').empty();
  var roomNames = [];
  var elements = [];
  for (var key in rooms) {
    roomNames.push(key);
  }
  for (var i = 0; i < roomNames.length; i++) {
    elements.push("<li><a href='#' class='roomName'>" + roomNames[i] + "</a></li>");
  }
  $("#roomMenu").append(elements.join(''));
};

app.clearMessages = function () {
  $('#chats').empty();
  $('.nav-tabs').empty();
  $('.tab-content ul').empty();
};


app.escapeHtml = function (string) {
  var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': '&quot;',
      "'": '&#39;',
      "/": '&#x2F;'
  };
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
};

app.escapeRoom = function (string) {
  if (string.indexOf(" ") === 1) {
    string.split(' ').join('');
  }
  return string;
};

app.handleSubmit = function () {
  var username = window.location.search.split('=')[1];
  var text = $('#message').val();

  var message = {
    'user' : username,
    'msg_text' : text,
    'room' : app.room
  };
  app.send(message);
  $('#message').val('');
};


app.init();
