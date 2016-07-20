var inspector = require('schema-inspector');
var _ = require('underscore');
var nodes = [
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
var getNodeStructure = function(nodeName){
    var node = _.find(nodes,function(n){
        return n.name === nodeName
    })
    node.nodeId = node.name + '_' +  guid();
    // extract fields from modelSchema
    node.fields = getFieldsFromModelSchema(node.modelSchema);
    // remove not required properties
    delete node.modelSchema;
    return node;
}

/**
 * Returns only fields names from modelSchema
 * @param modelSchema
 * @returns {Array}
 */
var getFieldsFromModelSchema = function(modelSchema){
    var fields = [];
    for (var key in modelSchema){
        var required = false;
        if (modelSchema[key]["validation"] && modelSchema[key]["validation"]["minLength"]){
            required = true;
        }
        var field = {name:key,required:required}
        fields.push(field)
    }
    return fields;
}
var getSanitizeSchema = function(nodeModelSchema){
    var sanitization = {type:"object",properties:{}}
    if (!nodeModelSchema){
        throw new Error("missing connector schema")
    }
    for (var field in nodeModelSchema){
        if (nodeModelSchema[field].sanitization){
            sanitization.properties[field] = nodeModelSchema[field].sanitization;
        }

    }
    return sanitization
}
var getValidationSchema = function(nodeModelSchema){
    var validation = {type:"object",properties:{}}
    if (!nodeModelSchema){
        throw new Error("missing connector schema")
    }
    for (var field in nodeModelSchema){
        if (nodeModelSchema[field].validation){
            validation.properties[field] = nodeModelSchema[field].validation;
        }

    }
    return validation
}


module.exports = {
    getNodeStructure:getNodeStructure,
    getFieldsFromModelSchema:getFieldsFromModelSchema
}