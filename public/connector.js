$("#form").alpaca({
    "data": {},
    "schema": {
                "title": "New Connector",
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name",
                        "description":"Name of the connector, this has to be unique",
                        "required":true,
                        "minLength":1
                    },
                    "description": {
                        "type": "string",
                        "title": "Description",
                        "description":"Short description about the connector, what is does and all"
                    },
                    "schemaFields": {
                        "type": "array",
                        "minLength":1,
                        "required":true,
                        "items": {
                            "type": "object",
                            "properties": {
                                "fieldName": {
                                    "title":"FieldName",
                                    "description":"Name of the field.",
                                    "type": "string",
                                    "required":true,
                                    "minLength":1,
                                    "maxLength":50
                                },
                                "fieldDescription": {
                                    "title":"Description"
                                } ,
                                "type":{
                                    "title": "DataType",
                                    "description":"Data type of field",
                                    "type":"string",
                                    "enum":['string','number','integer','boolean','date','any','array'],
                                    "default":'string'
                                },
                                "optional":{
                                    "title":"Required",
                                    "description":"Defines if property is required or not",
                                    "type":"string",
                                    "enum":['true','false'],
                                    "default":'false'
                                },
                                // dependency on type == string,array
                                "minLength":{
                                    "title": "MinLength",
                                    "description":"Min length in case of string or array",
                                    "type":"number",
                                    "required":true,
                                    "minimum":1,
                                    "default":1
                                },
                                // dependency on type == string,array
                                "maxLength":{
                                    "title": "MaxLength",
                                    "type":"number",
                                    "required":true
                                },
                                // Specify possible values in case its an array
                                "arrayValues":{
                                    "title":"Possible Values",
                                    "description":"List of possible array values in case field is an array",
                                    "type":"array",
                                    "minLength":1,
                                    "required":true,
                                    "items":{
                                        "type": "object",
                                        "properties":{
                                            "value":{
                                                "type":"string",
                                                "required":true,
                                                "minLength":1
                                            }
                                        }
                                    }
                                },
                                // dependency on type == string
                                "pattern":{
                                    "title": "Pattern",
                                    "type":"string",
                                    "enum":['regexp','email','url','date-time','date','time','color','numeric','integer','decimal','alpha','alphaNumeric','upperString','lowerString'],
                                    "default":'alphaNumeric',
                                    "required":true
                                },
                                "patternValue":{
                                    "title":"Regex Value for pattern",
                                    "type":"string",
                                    "required":true,
                                    "minLength":1
                                },
                                "rules":{
                                    "title":"Compare",
                                    "type":"array",
                                      "minLength":0,
                                    "items": {
                                        "type": "object",
                                        "properties":{
                                            "operator":{
                                                "title":"Operator",
                                                "type":"string",
                                                "enum":['lt','lte','gt','gte','eq','ne'],
                                                "default":'lt'
                                            },
                                            "operatorValue":{
                                                "title":"Value",
                                                "type":"number",
                                                "minLength":1,
                                                "required":true
                                            }
                                        }
                                    }
                                }
                            },
                            "dependencies":{
                                "minLength": ["type"],
                                "maxLength": ["type"],
                                "pattern":["type"],
                                "arrayValues":["type"],
                                "patternValue":["pattern"],
                                "rules":["type"]
                            }
                        }
                    },
                    "public":{
                        "title":"Public",
                        "type":"string",
                        "enum":['true','false'],
                        "default":'false'
                    }
                    
                }
            },
    "options":{
                "fields":{
                    "name":{
                        "focus":true,
                        "showMessages":true,
                        "validate":true
                    },
                    "schemaFields":{
                        "toolbarSticky": true,
                        "showMessages":true,
                        "validate":true,
                        "fields":{
                            "item": {
                                "fields":{
                                    "fieldDescription" : {
                                        "type": "textarea",
                                        "rows": 2,
                                        "cols": 40
                                    },
                                    "type":{
                                        "removeDefaultNone": true,
                                        "type":"select"
                                    },
                                    "optional":{
                                        "removeDefaultNone": true
                                    },
                                    "minLength":{
                                        "dependencies":{
                                            "type":"string"
                                        }
                                    },
                                    "maxLength":{
                                        "dependencies":{
                                            "type":"string"
                                        }
                                    },
                                    "pattern":{
                                        "removeDefaultNone": true,
                                        "dependencies":{
                                            "type":["string"]
                                        }
                                    },
                                    "patternValue":{
                                        "dependencies":{
                                            "pattern":"regexp"
                                        }
                                    },
                                    "arrayValues":{
                                        "dependencies":{
                                            "type":"array"
                                        }
                                    },
                                    "rules":{
                                        "toolbarSticky": true,
                                        "dependencies":{
                                            "type":"number"
                                        },
                                        "fields":{
                                            "item":{
                                                "fields":{
                                                    "operator":{
                                                        "removeDefaultNone": true,
                                                        "type":"select"
                                                    },
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    },
                    "public":{
                        "removeDefaultNone": true
                    },
                },
                "form":{
                    "attributes":{
                        "action":"/connector",
                        "method":"POST"
                    },
                    "buttons":{
                        "submit":{
                            "title": "Save",
                            "click": function() {
                                var val = this.getValue();
                                if (this.isValid(true)) {
                                    alert("Valid value: " + JSON.stringify(val, null, "  "));
                                    this.ajaxSubmit().done(function() {
                                        console.log(JSON.stringify(val, null, "  "))
                                    });
                                } else {
                                    alert("Invalid value: " + JSON.stringify(val, null, "  "));
                                }
                            }
                        }
                    }
                },
            },
    "view": {
        "parent": "bootstrap-edit-horizontal",
        "wizard": {
            "title": "Welcome to the Wizard",
            "description": "Please fill things in as you wish",
            "bindings": {
                "name": 1,
                "description":1,
                "schemaFields": 2,
                "public":3
            },
            "steps": [{
                "title": "Connector Info",
                "description": "Basic Information"
            }, {
                "title": "Fields",
                "description": "Specify connector attributes"
            }, {
                "title": "Settings",
                "description": "Advance options."
            }],
            "hideSubmitButton":true
        }
    }
});