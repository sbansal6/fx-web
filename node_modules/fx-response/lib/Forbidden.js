'use strict';
function Forbidden(code, error) {
  Error.call(this, error.message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'Forbidden';
  this.message = error.message;
  this.code = code;
  this.status = 401;
  this.inner = error;
}
Forbidden.prototype = Object.create(Error.prototype);
Forbidden.prototype.constructor = Forbidden;
module.exports = Forbidden;