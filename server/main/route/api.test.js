var rewire = require('rewire');
var apiRoute = rewire('./api');
var expect = require('chai').expect;
var Node = require("../../model/").node;

describe('api.route', function() {

    var castToConnector;
    var user = {
        _id: "testuserid"
    }

    castToConnector = apiRoute.__get__('castToConnector');

    describe('castToConnector', function() {

        it('should return a valid connector object', function() {
            var body = {
                name: 'TestConnector',
                description: 'Test Connector',
                schemaFields: [{
                    fieldName: 'Id',
                    fieldDescription: 'test id',
                    type: 'string',
                    optional: 'false',
                    minLength: '1',
                    maxLength: '255',
                    pattern: 'alphaNumeric'
                }]
            }
            var result = castToConnector(user, body);
            expect(result).to.be.an.instanceof(Node);
            expect(result.scheme).to.be.an('object');
            expect(Object.keys(result.scheme).length).to.equal(1);
        })

    })

})