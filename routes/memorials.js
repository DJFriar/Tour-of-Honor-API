const moment = require('moment');
const { json } = require('express');
const db = require("../models")
const Sequelize = require("sequelize");
/*   */

module.exports = function (app) {

  app.get('/v1/memorials', function(req, res, next) {
    db.Memorial.findAll({
      //attributes: ['Name', 'Code',"Category","Region"]
    }).then(result => {
     
      res.json(result);
    });
  });


   // POST
   app.post('/v1/memorials', function(req, res, next) {
    db.Memorial.create({
      Name: req.body.Name,
      Code: req.body.Code,
      Category: req.body.Category,
      Region: req.body.Region,
      Latitude: req.body.Latitude,
      Longitude: req.body.Longitude,
      Address1: req.body.Address1,
      City: req.body.City,
      State: req.body.State,
      Access: req.body.Access,
      MultiImage: req.body.MultiImage,
      Restrictions: req.body.Restrictions,
      RallyYear: req.body.RallyYear,
    })
    .then( result => {
      if (req.body.Metadata.length > 0){
        console.log("array")
        req.body.Metadata.forEach(function(i){
          console.log(i);
          db.MemorialMeta.create({MemorialID: result.id,"Heading":i.Heading,"Text":i.Text});
        });
      }
      res.send("inserted");

    }).catch(err => {    });
  });
}