const moment = require('moment');
const { json } = require('express');
const db = require("../models")
const Sequelize = require("sequelize");

/*   */

module.exports = function (app) {
  // GET
  app.get('/v1/users', function(req, res, next) {
    db.User.count({}).then(count_result => {
      if (count_result == 0) {
        db.User.create({
          FirstName: "Tommy",
          LastName: "Craft",
          Email: "me@tommyc.net",
          Password: "tempAppPass",
          UserRole: "Admin"
        })
        .then(() => {
          db.User.findAll({}).then(result => {
            res.send(result);
          });
        })
      } else {
        db.User.findAll({attributes: ['FirstName', 'LastName',"Email","UserRole"]}).then(result => {
          res.send(result);
        });
      }
    }).catch(err => {    });
  });
  app.get('/v1/users/:uid', function(req, res, next) {
    const uid = req.params.uid;

    db.User.findOne({where:{id:uid}
      //attributes: ['Name', 'Code',"Category","Region"]
    }).then(result => {
     
      res.json(result);
    });
  });

  // POST
  app.post('/v1/users', function(req, res, next) {
    console.log(req.body);
    db.User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Password: req.body.Password,
      UserRole: req.body.UserRole
    })
    .then( result => {
      //result.Password = NULL;
      console.log(result);
      res.send(result);
      // db.User.findOne({}).then(result => {
      //   res.send(result);
      // });
    }).catch(err => {    });
  });
  //
  // PUT
  app.put('/v1/users', function(req, res, next) {
    console.log(req.body);
    db.User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Password: req.body.Password,
      UserRole: req.body.UserRole
    })
    .then( result => {
      //result.Password = NULL;
      //TODO fix the fields we return to not include password
      console.log(result);
      res.send(result);
    }).catch(err => {    });
  });
}