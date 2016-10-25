var inspector = require('schema-inspector');
var _ = require('underscore');
var clone = require('clone');
var node = require("../model").node;

var STRICT_NODES= [
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
        , type: 'connector'
        , category: 'connector'
        , image: "http://www.about-searchengines.com/_/rsrc/1375438908754/home/google-g-logo-s.png"
        , modelSchema: {
        id: {
            sanitization: {
                type: 'string',
                rules: ['trim']
            },
            validation: {
                type: 'string',
                optional: false,
                minLength: 1,
                maxLength: 50
            },
            description:"The identifier for each item has to be unique within your account, and cannot be re-used between feeds. If you have multiple feeds, ids of items within different feeds must still be unique. You can use any sequence of letters and digits for the item id. "
        },
        title: {
            sanitization: {
                type: 'string',
                rules: ['trim']

            },
            validation: {
                type: 'string',
                optional: false,
                minLength: 1,
                maxLength: 150
            },
            description:"Name of your item. We recommend you include characteristics such as color or brand in the title which differentiates the item from other products."

        },
        description: {
            sanitization: {
                type: 'string',
                rules: ['trim']

            },
            validation: {
                type: 'string',
                optional: false,
                minLength: 1,
                maxLength: 5000
            },
            description: "A text describing your item. Includes only information relevant to the item. Do not include any promotional text such as 'Free shipping', do not use BLOCK CAPITALS, and do not include a description of your store."
        },
        google_product_category: {
            sanitization: {
                type: 'string',
                rules: ['trim']

            },
            validation: {
                optional: false,
                type: 'string',
                minLength: 1,
                maxLength: 5000
            },
            description: "The 'google product category' attribute indicates the category of the product being submitted, according to the Google product taxonomy. This attribute accepts only one value, taken from the product taxonomy tree. If your items fall into multiple categories, include only one category which is the most relevant."
        },
        product_type: {
            sanitization: {
                type: 'string',
                rules: ['trim']

            },
            validation: {
                type: 'string',
                minLength: 0,
                maxLength: 750
            },
            description:"This attribute also indicates the category of the product being submitted, but you can provide your own classification. Unlike the 'Google product category', you can include more than one 'product type' attribute value if products apply to more than one category. Please include the full category string."

        },
        link: {
            sanitization: {
                type: 'string',
                rules: ['trim']

            },
            validation: {
                type: 'string',
                pattern: 'url',
                minLength: 1,
                maxLength: 2000
            },
            description: "A link to a product page. Landing pages requiring sign ups, passwords, or direct links to files/email addresses are not allowed. Links should not contain raw ip addresses."
        },
        image_link: {
            sanitization: {
                type: 'string',
                rules: ['trim']

            },
            validation: {
                type: 'string',
                pattern: 'url',
                minLength: 1,
                maxLength: 2000
            },
            description: "This is the URL of an associated image for a product. Submit full-size images for your products and do not submit thumbnail versions of the images. For all apparel products, Google requires images of at least 250 x 250 pixels and recommends images of at least 400 x 400 pixels. If you have multiple images of the item, submit the main view using this attribute, and include all other views in the 'additional image link' attribute."
        },
        price: {
            validation: {
                type: 'number'
            },
            description: "The price of the item. Has to be the most prominent price on the landing page. If multiple items are on the same page with multiple prices, it has to be straightforward for the user to find the correct item and corresponding price. All submitted prices must exactly match the price displayed on your website. If you do not provide a currency with the price (e.g. 15.00 USD), Google will assume the currency is the same as that of your target country."
        },
        condition: {
            sanitization: {
                type: 'string',
                rules: ['trim']

            },
            validation: {
                type: 'string',
                minLength: 1,
                maxLength: 2000
            },
            description: "Describes the condition of your product. Accepted values are: 'new', 'refurbished' and 'used'."
        },
        availability: {
            description: "Stock status of your product. Accepted values are: 'in stock', 'out of stock', 'available for order', 'preorder'."
        },
        brand: {
            description: "Brand of the product. This is required for all product UNLESS 1) You have already added GTIN and MPN or 2) You sell books, media or custom made products."
        },
        gtin: {
            description:"Global Trade Item Numbers (GTINs) for your products. These identifiers include UPC (in North America), EAN (in Europe), JAN (in Japan), and ISBN (for books)."
        },
        mpn: {
            description:"The manufacturer product number. Uniquely identifies the product to it's manufacturer."
        },
        item_group_id: {
            description:"All items that are color/material/pattern/size variants of the same product must have the same item group id. If you have a “Parent SKU” that is shared by all variants of a product, you can provide that as the value for 'item group id'."
        },
        additional_image_link: {
            description:"This is the URL of an additional image for a product. For example, if you have images that show the product from a different angle than the main image."
        },
        sale_price: {
            description:"Use this attribute to submit the advertised sale price of the item. When a sale is active, the sale price will be shown as the current price in Google Shopping search results."
        },
        sale_price_effective_date: {
            description:"Used in conjunction with sale price. This attribute indicates the date range during which the sale price applies. Start and end dates separated by a forward slash (/). The start is specified by the format (YYYY-MM-DD), followed by the letter ‘T’, the time of the day when the sale starts, followed by an expression of the timezone for the sale. The end date should be in the same format. Example: 2011-03-01T13:00-0800/2011-03-11T15:30-0800"
        },
        gender: {
            description:"Defines the gender of an item. Accepted values are: 'Male', 'Female' and 'Unisex'."
        },
        age_group: {
            description:"Defines the age group of an item. Accepted values are: 'Adult', 'Kids'."
        },
        color: {
            description:"Defines the dominant color of an item."
        },
        size: {
            description:"Defines the size of an item."
        },
        material: {
            description:"The material or fabric that a product is made out of. "
        },
        pattern: {
            description:"The pattern or graphic print featured on a product. For example, a t-shirt might have a logo of a sports team and have pattern values of “Bears”, “Tigers”, etc. A dress might come in two prints, and have pattern values of “Polka Dot”, “Striped”, “Paisley”, etc."
        },
        shipping_weight: {
            description:"This is the weight of the product used to calculate the shipping cost of the item. If you have specified a global shipping rule that is dependent on shipping weight, this attribute will be used to calculate the shipping cost of the item automatically. "
        },
        adwords_grouping: {
            description:"Used to group products in an arbitrary way. It can be used for Product Filters to limit a campaign to a group of products, or Product Targets to bid differently for a group of products. It can only hold one value. Example: Set adwords_grouping based on price ranges to bid differently on products of different values."
        },
        adwords_labels: {
            description:"Used to group products in an arbitrary way. It can be used for Product Filters to limit a campaign to a group of products, or Product Targets to bid differently for a group of products. It can only hold multiple values. Example: Set adwords_labels based on color and size to bid differently on products of different colors and sizes. You can easily create AdWords Labels in the AdWords Labels tab"
        },
        excluded_destination: {
            description:"By default, your items will also appear in Google Commerce Search if you’re submitting to Google Shopping. Include this attribute if you are using either Google Shopping or Commerce Search and you would like to exclude the item from either of these destinations. Accepted values are: Shopping and Commerce Search"
        },
        online_only: {
            description:"Required only if you've submitted your store locations, and you have items that you sell online but not in your physical stores. Accepted values are: 'y', if any item is not available in your store to purchase or 'n' if a customer can buy the posted item at your physical location."
        },
        expiration_date: {
            description:"This is the date that an item listing will expire. If you do not provide this attribute, items will expire and no longer appear in Google Shopping results, 30 days after your last update. You cannot use this attribute to extend the expiration period to longer than 30 days. Format: YYYY-MM-DD. Example: 2004-08-19."
        },
        adwords_redirect: {
            description:"Allows advertisers to specify a separate URL that can be used to track traffic coming from Google Shopping. If this attribute is provided, you must make sure that the URL provided through 'adwords redirect' will redirect to the same website as given in the link attribute."
        },
        adult: {
            descripton:"The adult status assigned to your product listings through the ‘adult’ attribute affects where product listings can show. For example, 'adult' or 'non-family safe' product listings aren't allowed to be shown in certain countries or to a certain audience."
        },
        multipack: {
            description:"Multipacks are packages that include several identical products to create a larger unit of sale, submitted as a single item. Merchant-defined multipacks are custom groups of identical products submitted as a single unit of sale. The ‘multipack’ attribute indicates the number of identical products in a merchant-defined multipack."
        }
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
            "searchValue": "this",
            "newValue": "that"
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
                    "title": "start",
                    "minimum": 0,
                    "required": true
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
    var node = clone(getNodeByName(nodeName));
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
    //console.log('all nodes',JSON.stringify(STRICT_NODES))
    var node = _.find(STRICT_NODES,function(n){
        return n.name === nodeName
    })
    //console.log('getNodeByName',node)
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
        var field = {name:key,required:required,description:node.modelSchema[key]["description"]}
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
    //console.log('getting nodevalidation schema',nodeName)
    var node = getNodeByName(nodeName);
    var validation = {type:"object",properties:{}}
    for (var field in node.modelSchema){
        if (node.modelSchema[field].validation){
            validation.properties[field] = node.modelSchema[field].validation;
        }
    }
    //console.log('returning schema',validation)
    return validation
}

/**
 * Returns nodes that are supposed to be in palette
 */
var paletteNodes = function () {
    return _.filter(STRICT_NODES,function(n){
        return (n.palette === true)
    })
}

/*
 * Convert data from req body to connector format
 */
function castToConnector(user,body){
    var connector = new node();
    connector.userId = user._id;
    connector.name = body.name;
    connector.description = body.description;
    connector.version = body.version || 'v 1.0.0';
    connector.type = 'Connector';
    connector.image = '';
    connector.published = body.public;
    connector.scheme = {};
    
    var tempSchema = {};
    for (var property in body){
        if (property.startsWith("schemaFields_")) {
            var parts = property.split('_');
            if (!tempSchema[parts[1]]){
                tempSchema[parts[1]] = {};
            } 
            tempSchema[parts[1]][parts[2]] = body[property];
        }
    }
    
    for (var property in tempSchema) {
        var fieldName = tempSchema[property]["fieldName"]
        connector.scheme[fieldName] = {};
        connector.scheme[fieldName]["description"] = tempSchema[property]["fieldDescription"];
        var validation = {};
        for (var innerproperty in tempSchema[property]) {
            if (!innerproperty.startsWith("field")) {
                validation[innerproperty] = tempSchema[property][innerproperty];
            }
        }
        connector.scheme[fieldName]["validation"] = validation
    }
    
    return connector;
}

/*
 * Adds a new connector to the system 
 */
function addConnector(user,body,cb) {
    var connector = castToConnector(user,body);
    connector.save(cb);
}

/**
 * Returns all connectors created by this user
 */
var getConnectors = function(userId,cb){
    node.find({userId:userId},cb)
}

module.exports = {
    getNodeUIStructure:getNodeUIStructure,
    getNodeFields:getNodeFields,
    getNodeSanitizeSchema:getNodeSanitizeSchema,
    getNodeValidationSchema:getNodeValidationSchema,
    paletteNodes:paletteNodes,
    getConnectors:getConnectors,
    addConnector:addConnector,
    castToConnector:castToConnector
}


