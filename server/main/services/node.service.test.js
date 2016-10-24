var rewire = require('rewire');
var Node = require("../model/").node;
var nodeService = rewire('./node.service');
var expect = require('chai').expect;
var mongoose = require("mongoose");

describe('node.service',function(){

    var NODES = [
        {    name:'File'
            ,label:'File'
            ,type:'source'
            ,category:'source'
            ,image:"http://www.knowledgebase-script.com/kb/assets/file-txt.png"
            ,modelSchema:{
            field1:{},
            field2:{},
            field3:{}
        }
            ,schema : {
            "type": "object",
            "properties": {
                "selectFile": {
                    "type": "string",
                    "format": "uri"
                },
                "type": {
                    "type":"string",
                    "title":"FileType",
                    "enum":['csv','tab']
                }
            }
        }
            ,options :{
            "fields":{
                "selectFile": {
                    "type": "file"

                },
                "type":{
                    "removeDefaultNone":true
                }
            },
            "form": {
                "attributes": {
                    "method": "POST",
                    "action": "/upload"
                },
                "buttons": {
                    "submit": {
                        "value": "Submit the Form",
                        "click": function(){
                            // this has all the values, use this to update data object or any other object on save.
                            var val = this.getValue();
                            var form = $('#alpaca2')
                            form.ajaxSubmit({
                                error: function(xhr) {
                                    console.log('error happend in form submit',xhr.status)
                                    alert('Error: ' + xhr.status);
                                },
                                success: function(response) {
                                    alert(response);
                                    console.log('selected node',nodeId)
                                }
                            });
                            return false;

                        }
                    }


                }
            }

        }
            ,data:{}
        },
        {
            name: 'Google'
            , label: 'Google'
            , type: 'target'
            , category: 'target'
            , image: "http://www.about-searchengines.com/_/rsrc/1375438908754/home/google-g-logo-s.png"
            , modelSchema: {
            id: {
                sanitization: {
                    type: 'string',
                    rules: ['trim']

                },
                validation: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 2
                },
            },
            title: {
                sanitization: {
                    type: 'string',
                    rules: ['trim']

                },
                validation: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 5
                },

            },
            description: {
                presence: true
            },
            google_product_category: {
                presence: true
            },
            product_type: {},
            link: {
                presence: true
            },
            image_link: {
                presence: true
            },
            price: {
                presence: true
            },
            condition: {
                presence: true
            },
            availability: {
                presence: true
            },
            brand: {
                presence: true
            },
            gtin: {},
            mpn: {},
            item_group_id: {},
            google_product_category: {},
            additional_image_link: {},
            sale_price: {},
            sale_price_effective_date: {},
            gender: {},
            age_group: {},
            color: {},
            size: {},
            material: {},
            pattern: {},
            shipping_weight: {},
            adwords_grouping: {},
            adwords_labels: {},
            excluded_destination: {},
            online_only: {},
            expiration_date: {},
            adwords_redirect: {},
            adult: {},
            multipack: {}
        }

        }
    ];

    before(function(done){
        nodeService.__set__('NODES',NODES);
        mongoose.connect('mongodb://dev:feedexchange@ds048719.mlab.com:48719/feedexchange_dev');
        var newNode = new Node();
        newNode["scheme"] = {
        "Id": {
            "validation": {
                "pattern": "alphaNumeric",
                "maxLength": "255",
                "minLength": "1",
                "optional": "true",
                "type": "string"
            }
        }
        },
        newNode["published"] = false
        newNode["image"] = ""
        newNode["type"] = "Connector"
        newNode["version"] = "v 1.0.0"
        newNode["description"] = "Test Connector"
        newNode["name"] = "Test"
        newNode["userId"] = "testUserId"
        newNode.save(done)
    })
    
    after(function(done){
        Node.remove({},done)
    })

    describe('getNodeFields',function(){
        it('should return an array of fields with valid schema',function(){
            var fields = nodeService.getNodeFields('Google');
            expect(fields).to.be.an('array');
            expect(fields[0]).to.have.property('name')
            expect(fields[0]).to.have.property('required')
        })
    })

    describe('getNodeUIStructure',function(){
        it('Returns valid structure',function(){
            var googleStructure = nodeService.getNodeUIStructure('Google')
            expect(googleStructure).to.be.an('object')
        })
    })
    
    describe('getConnectors',function(){
        
        it('should return 0 connectors',function(done){
            nodeService.getConnectors('xxx',function(err,docs){
                console.log('docs',docs)
                done()
            })
        })
        
         it('should return 1 connectors',function(done){
            nodeService.getConnectors('testUserId',function(err,docs){
                console.log('docs',docs)
                done()
            })
        })
        
        
    })
})

