var middleware = require('../middleware');
module.exports = function (app, passport) {
  require('./login')(app, passport);
  require('./forgotPassword')(app,passport);
  require('./logout')(app, passport);
  require('./signup')(app, passport);
  require('./dashboard')(app, middleware.isLoggedIn);
  require('./feedline')(app, middleware.isLoggedIn);
  require('./connector')(app, middleware.isLoggedIn);
  
  require('./api/nodes')(app, middleware.isLoggedIn);
};