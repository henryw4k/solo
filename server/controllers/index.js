var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {
      var get = bluebird.promisify( models.messages.get );
      get( req, res)
        .then(console.log("PROMISE WORKS!!!!"));

    },
    post: function (req, res) {
      // tell model to create new message
      var post = bluebird.promisify( models.messages.post );
      console.log( req.body)
      post( req.body )
        .then (res.send('posted message'))
        .then (console.log('it worked'));

      // console.log(req.body);
    }
  },

  users: {
    get: function (req, res) {
      var result = models.users.get( req );

    },
    post: function (req, res) {
      // tell model to create new user
      models.users.post(req.body);
      console.log('posting to user')
      res.send('posted user');

    }
  }
};

