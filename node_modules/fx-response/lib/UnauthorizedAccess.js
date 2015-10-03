'use strict';
function UnauthorizedAccess(code, error) {
  Error.call(this, error.message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'UnauthorizedAccess';
  this.message = error.message;
  this.code = code;
  this.status = 401;
  this.inner = error;
}
UnauthorizedAccess.prototype = Object.create(Error.prototype);
UnauthorizedAccess.prototype.constructor = UnauthorizedAccess;
module.exports = UnauthorizedAccess;