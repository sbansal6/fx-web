var inspector = require('schema-inspector');
var _ = require('underscore');

var NODES= [
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
        ,schema: {
            "type": "object",
            "properties": {
                "selectFile": {
                    "type": "string",
                    "format": "uri"
                },
                "type": {
                    "type":"string",
                    "title":"FileType",
                    "enum":['csv','tab'],
                    "required": true
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
    },
    {
        name:"Replace",
        label:"Replace",
        type:"transformation",
        category:"transformation",
        image:"http://documentation.platfora.com/webdocs/images/icons/icn_fx_expression.png",
        "schema": {
            "type": "object",
            "properties": {
                "searchValue": {
                    "type": "string",
                    "title": "searchValue"
                },
                "newValue": {
                    "type": "string",
                    "title": "newValue"
                }
            }
        },
        "data": {
            "searchValue": "John",
            "newValue": "McClane"
        }
    },
    {
        name:"SubString",
        label:"SubString",
        type:"transformation",
        category:"transformation",
        image:"http://documentation.platfora.com/webdocs/images/icons/icn_fx_expression.png",
        "schema": {
            "type": "object",
            "properties": {
                "startIndex": {
                    "type": "number",
                    "title": "start"
                },
                "endIndex": {
                    "type": "number",
                    "title": "end"
                }
            }
        },
        "data": {
            "startIndex": "1",
            "endIndex": "2"
        }
    }
];

/**
 * Generates a GUID string.
 * @returns {String} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser (slavik@meltser.info).
 * @link http://slavik.meltser.info/?p=142
 */
function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

/**
 * Trim down version of node for UI display
 * Only pass info specific to this instance of node
 */
var getNodeUIStructure = function(nodeName){
    var node = getNodeByName(nodeName);
    node.nodeId = node.name + '_' +  guid();
    // extract fields from modelSchema
    node.fields = getNodeFields(nodeName);
    // remove not required properties
    delete node.modelSchema;
    return node;
}

/**
 * Return node from NODE array by name
 * @param nodeName
 */
var getNodeByName = function(nodeName){
    var node = _.find(NODES,function(n){
        return n.name === nodeName
    })
    return node;
}

/**
 * Returns only fields names from modelSchema
 * @param modelSchema
 * @returns {Array}
 */
var getNodeFields = function(nodeName){
    var node = getNodeByName(nodeName)
    var fields = [];
    for (var key in node.modelSchema){
        var required = false;
        if (node.modelSchema[key]["validation"] && node.modelSchema[key]["validation"]["minLength"]){
            required = true;
        }
        var field = {name:key,required:required}
        fields.push(field)
    }
    return fields;
}

var getNodeSanitizeSchema = function(nodeName){
    var node = getNodeByName(nodeName);
    var sanitization = {type:"object",properties:{}}
    for (var field in node.modelSchema){
        if (node.modelSchema[field].sanitization){
            sanitization.properties[field] = node.modelSchema[field].sanitization;
        }

    }
    return sanitization
}

var getNodeValidationSchema = function(nodeName){
    var node = getNodeByName(nodeName);
    var validation = {type:"object",properties:{}}
    for (var field in node.modelSchema){
        if (node.modelSchema[field].validation){
            validation.properties[field] = node.modelSchema[field].validation;
        }

    }
    return validation
}

/**
 * Returns nodes that are supposed to be in palette
 */
var paletteNodes = function () {
    return _.filter(NODES,function(n){
        return (n.palette === true)
    })
}

module.exports = {
    getNodeUIStructure:getNodeUIStructure,
    getNodeFields:getNodeFields,
    getNodeSanitizeSchema:getNodeSanitizeSchema,
    getNodeValidationSchema:getNodeValidationSchema,
    paletteNodes:paletteNodes
}


