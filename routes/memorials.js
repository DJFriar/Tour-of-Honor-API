const moment = require('moment');
const { json } = require('express');
/*   */

module.exports = function (app) {
  app.get('/v1/memorials', function(req, res, next) {
    res.send('200 Success - TOH-API');
  });
}