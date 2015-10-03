'use strict';
function PageNotFound(code, error) {
  Error.call(this, typeof error === 'undefined' ? undefined : error.message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'PageNotFound';
  this.message = typeof error === 'undefined' ? undefined : error.message;
  this.code = typeof code === 'undefined' ? '404' : code;
  this.status = 404;
  this.inner = error;
}
PageNotFound.prototype = Object.create(Error.prototype);
PageNotFound.prototype.constructor = PageNotFound;
module.exports = PageNotFound;