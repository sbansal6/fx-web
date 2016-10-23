var rewire = require('rewire');
var passport = rewire('./passport');
var expect = require('chai').expect;

describe('passport',function(){

    var nodes = [
        {
             name:'File'
            ,label:'File'
            ,type:'source'
        },
        {
             name:'Google'
            ,label:'Google'
            ,type:'target'
        }
    ]
    var getNode =  passport.__get__('getNode');

    describe('getNode',function(){

        it('should return a File Node',function(){
            expect(getNode('File')).to.be.an('object')
        })

    })

})