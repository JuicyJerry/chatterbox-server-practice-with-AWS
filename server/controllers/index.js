var models = require("../models");

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function (err, results) {
        if (err) {
          /* do something */
          res.send(err);
        }
        res.json({results:results});
      });
    },
    post: function (req, res) {
     models.messages.post(req.body, (err,result)=>{
      if(err) {
        res.send(err)
      }
      else res.json({results:result});
     });

      // a function which handles posting a message to the database
    },
    // a function which handles posting a message to the database
  },

  users: {
    get: function (req, res) {
      models.users.get(function (err, results) {
        if (err) {
          /* do something */
        }
        res.json(results);
      });
    },
    post: function (req, res) {
      var params = [req.body.username];
      models.users.post(params, function (err) {
        if (err) {
          /* do something */
        }
        res.sendStatus(201);
      });
    },
  },
};
