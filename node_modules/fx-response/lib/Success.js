'use strict';
function Success(message, transaction, data) {
  this.status = 200;
  this.message = message == 'undefined' ? 'success' : message;
  this.transaction = {};
  this.transaction.id = transaction.id;
  this.transaction.status = transaction.status;
  this.transaction.message = transaction.message;
  this.data = data;
}
Success.prototype.constructor = Success;
module.exports = Success;