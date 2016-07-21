var nodeService = require('./node.service');
var expect = require('chai').expect;

describe('node.service',function(){
    describe('getFieldsFromModelSchema',function(){
        var nodeModelSchema =  {
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
        it('should return an array of fields with valid schema',function(){
            var fields = nodeService.getFieldsFromModelSchema(nodeModelSchema);
            expect(fields).to.be.an('array');
            expect(fields[0]).to.have.property('name')
            expect(fields[0]).to.have.property('required')
        })
    })
    describe('getNodeStructure',function(){
        it('Returns valid structure',function(){
            var googleStructure = nodeService.getNodeStructure('Google')
            expect(googleStructure).to.be.an('object')
        })
    })
})

