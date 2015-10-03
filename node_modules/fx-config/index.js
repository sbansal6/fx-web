var env = process.env.FEEDEXCHANGE_ENV ;
var config ;

switch (env) {
case 'PROD':
  config = require('./config/prod.json')
  break;
case 'STAGE':
  config = require('./config/staging.json')
  break;
default:
  config = require('./config/default.json')
}
module.exports = config ;
