var Sequelize = require("sequelize");
var db = require('../db');

var Message = db.define('Message', {
  user: Sequelize.STRING,
  msg_text: Sequelize.STRING,
  time: Sequelize.DATE,
  room: Sequelize.STRING
});

module.exports = {
  messages: {
    get: function (req, res) {
      // db.query('select * from messages', function (err, rows) {

      //   if(err){ console.log(err); }

      //   var resultsObj = { 'results' : rows.reverse() };
      //   res.send(resultsObj);
      //   console.log(resultsObj);
      // });

      Message.sync().success(function() {
        Message.findAll().success( function(rows) {
          var resultsObj = { 'results' : rows.reverse() };
          res.send(resultsObj);
        });
      });

    },
    post: function (message) {
      // db.query('insert into messages set ?', message);
      Message.sync().success(function() {
        Message.create(message);
      });
    }
  },

  users: {
    get: function () {},
    post: function (user) {
      // console.log(user);
    }
  }
};
