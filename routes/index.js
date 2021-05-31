var express = require('express');
var router = express.Router();
//const db = require('../models')
// const moment = require('moment');
const { json } = require('express');
const config = require("../common/config")
// const { Sequelize } = require('../models');
// const Op = Sequelize.Op;

/*   */
router.get('/', function(req, res, next) {
  res.send('200 Success - TOH-API');
});

module.exports = router;