const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
};
module.exports.database = {
  username: process.env.DBUSER,
  password: process.env.DBPASS,
  name: process.env.DATABASE,
  host: process.env.DBHOST,
  port: process.env.DBPORT,
}