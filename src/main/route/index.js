var middleware = require('../middleware');
module.exports = function (app, passport) {
  require('./lib/login')(app, passport);
  require('./lib/forgotPassword')(app,passport);
  require('./lib/logout')(app, passport);
  require('./lib/signup')(app, passport);
  require('./lib/home')(app, middleware.isLoggedIn);
  require('./lib/flow')(app, middleware.isLoggedIn);
  require('./lib/api')(app, middleware.isLoggedIn);
};