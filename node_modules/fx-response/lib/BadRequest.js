'use strict';
function BadRequest(code, error) {
  Error.call(this, typeof error === 'undefined' ? undefined : error.message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'BadRequest';
  this.message = typeof error === 'undefined' ? undefined : error.message;
  this.code = typeof code === 'undefined' ? '400' : code;
  this.status = 400;
  this.inner = error;
}
BadRequest.prototype = Object.create(Error.prototype);
BadRequest.prototype.constructor = BadRequest;
module.exports = BadRequest;