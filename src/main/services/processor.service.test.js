/**
 * Created by saurabhbansal on 7/20/16.
 */
var processorService = require('./processor.service');
var expect = require('chai').expect;


describe('processor.service',function(){

    var toolData =  {
        "name": "google",
        "_id": "579b9b49a31c34b89312758c",
        "canvas": {
            "nodes": [
                {
                    "nodeId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39",
                    "nodeName": "Google",
                    "positionX": "239",
                    "positionY": "23"
                },
                {
                    "nodeId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e",
                    "nodeName": "File",
                    "positionX": "30",
                    "positionY": "30"
                }
            ],
            "connections": [
                {
                    "connectionId": "con_112",
                    "pageSourceId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e_ProductId",
                    "pageTargetId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39_id",
                    "anchors": [
                        [
                            "1",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ]
                    ]
                },
                {
                    "connectionId": "con_112",
                    "pageSourceId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e_ProductId",
                    "pageTargetId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39_link",
                    "anchors": [
                        [
                            "1",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ]
                    ]
                }
            ]
        },
        "settings": "",
        "nodes": [
            {
                "name": "File",
                "label": "File",
                "type": "source",
                "category": "source",
                "image": "http://www.knowledgebase-script.com/kb/assets/file-txt.png",
                "schema": {
                    "type": "object",
                    "properties": {
                        "selectFile": {
                            "type": "string",
                            "format": "uri"
                        },
                        "type": {
                            "type": "string",
                            "title": "FileType",
                            "enum": [
                                "csv",
                                "tab"
                            ]
                        }
                    }
                },
                "options": {
                    "fields": {
                        "selectFile": {
                            "type": "file"
                        },
                        "type": {
                            "removeDefaultNone": "true"
                        }
                    },
                    "form": {
                        "attributes": {
                            "method": "POST",
                            "action": "/upload"
                        },
                        "buttons": {
                            "submit": {
                                "value": "Submit the Form"
                            }
                        }
                    }
                },
                "nodeId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e",
                "fields": [
                    {
                        "name": "ProuctId"
                    },
                    {
                        "name": "Desc"
                    },
                    {
                        "name": "Details"
                    },
                    {
                        "name": "MPN"
                    },
                    {
                        "name": "Color"
                    }
                ],
                "data": {
                    "type": "csv"
                },
                "fileName": "sampleFile.csv",
                "positionX": "30",
                "positionY": "30"
            },
            {
                "name": "Google",
                "label": "Google",
                "type": "target",
                "category": "target",
                "image": "http://www.about-searchengines.com/_/rsrc/1375438908754/home/google-g-logo-s.png",
                "nodeId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39",
                "fields": [
                    {
                        "name": "id",
                        "required": "true"
                    },
                    {
                        "name": "title",
                        "required": "true"
                    },
                    {
                        "name": "description",
                        "required": "false"
                    },
                    {
                        "name": "google_product_category",
                        "required": "false"
                    },
                    {
                        "name": "product_type",
                        "required": "false"
                    },
                    {
                        "name": "link",
                        "required": "false"
                    },
                    {
                        "name": "image_link",
                        "required": "false"
                    },
                    {
                        "name": "price",
                        "required": "false"
                    },
                    {
                        "name": "condition",
                        "required": "false"
                    },
                    {
                        "name": "availability",
                        "required": "false"
                    },
                    {
                        "name": "brand",
                        "required": "false"
                    },
                    {
                        "name": "gtin",
                        "required": "false"
                    },
                    {
                        "name": "mpn",
                        "required": "false"
                    },
                    {
                        "name": "item_group_id",
                        "required": "false"
                    },
                    {
                        "name": "additional_image_link",
                        "required": "false"
                    },
                    {
                        "name": "sale_price",
                        "required": "false"
                    },
                    {
                        "name": "sale_price_effective_date",
                        "required": "false"
                    },
                    {
                        "name": "gender",
                        "required": "false"
                    },
                    {
                        "name": "age_group",
                        "required": "false"
                    },
                    {
                        "name": "color",
                        "required": "false"
                    },
                    {
                        "name": "size",
                        "required": "false"
                    },
                    {
                        "name": "material",
                        "required": "false"
                    },
                    {
                        "name": "pattern",
                        "required": "false"
                    },
                    {
                        "name": "shipping_weight",
                        "required": "false"
                    },
                    {
                        "name": "adwords_grouping",
                        "required": "false"
                    },
                    {
                        "name": "adwords_labels",
                        "required": "false"
                    },
                    {
                        "name": "excluded_destination",
                        "required": "false"
                    },
                    {
                        "name": "online_only",
                        "required": "false"
                    },
                    {
                        "name": "expiration_date",
                        "required": "false"
                    },
                    {
                        "name": "adwords_redirect",
                        "required": "false"
                    },
                    {
                        "name": "adult",
                        "required": "false"
                    },
                    {
                        "name": "multipack",
                        "required": "false"
                    }
                ],
                "positionX": "239",
                "positionY": "23"
            }
        ]
    }
    var toolData2 = {
        "name": "google",
        "_id": "579b9b49a31c34b89312758c",
        "canvas": {
        "nodes": [
            {
                "nodeId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39",
                "nodeName": "Google",
                "positionX": "239",
                "positionY": "23"
            },
            {
                "nodeId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e",
                "nodeName": "File",
                "positionX": "30",
                "positionY": "30"
            }
        ],
            "connections": [
            {
                "connectionId": "con_112",
                "pageSourceId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e_ProductId",
                "pageTargetId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39_id",
                "anchors": [
                    [
                        "1",
                        "0.5",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    [
                        "0",
                        "0.5",
                        "0",
                        "0",
                        "0",
                        "0"
                    ]
                ]
            },
            {
                "connectionId": "con_117",
                "pageSourceId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e_Desc",
                "pageTargetId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39_title",
                "anchors": [
                    [
                        "1",
                        "0.5",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    [
                        "0",
                        "0.5",
                        "0",
                        "0",
                        "0",
                        "0"
                    ]
                ]
            },
            {
                "connectionId": "con_122",
                "pageSourceId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e_Details",
                "pageTargetId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39_description",
                "anchors": [
                    [
                        "1",
                        "0.5",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    [
                        "0",
                        "0.5",
                        "0",
                        "0",
                        "0",
                        "0"
                    ]
                ]
            },
            {
                "connectionId": "con_127",
                "pageSourceId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e_MPN",
                "pageTargetId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39_google_product_category",
                "anchors": [
                    [
                        "1",
                        "0.5",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    [
                        "0",
                        "0.5",
                        "0",
                        "0",
                        "0",
                        "0"
                    ]
                ]
            },
            {
                "connectionId": "con_132",
                "pageSourceId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e_Color",
                "pageTargetId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39_product_type",
                "anchors": [
                    [
                        "1",
                        "0.5",
                        "0",
                        "0",
                        "0",
                        "0"
                    ],
                    [
                        "0",
                        "0.5",
                        "0",
                        "0",
                        "0",
                        "0"
                    ]
                ]
            }
        ]
    },
        "settings": "",
        "nodes": [
        {
            "name": "File",
            "label": "File",
            "type": "source",
            "category": "source",
            "image": "http://www.knowledgebase-script.com/kb/assets/file-txt.png",
            "schema": {
                "type": "object",
                "properties": {
                    "selectFile": {
                        "type": "string",
                        "format": "uri"
                    },
                    "type": {
                        "type": "string",
                        "title": "FileType",
                        "enum": [
                            "csv",
                            "tab"
                        ]
                    }
                }
            },
            "options": {
                "fields": {
                    "selectFile": {
                        "type": "file"
                    },
                    "type": {
                        "removeDefaultNone": "true"
                    }
                },
                "form": {
                    "attributes": {
                        "method": "POST",
                        "action": "/upload"
                    },
                    "buttons": {
                        "submit": {
                            "value": "Submit the Form"
                        }
                    }
                }
            },
            "nodeId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e",
            "fields": [
                {
                    "name": "ProuctId"
                },
                {
                    "name": "Desc"
                },
                {
                    "name": "Details"
                },
                {
                    "name": "MPN"
                },
                {
                    "name": "Color"
                }
            ],
            "data": {
                "type": "csv"
            },
            "fileName": "sampleFile.csv",
            "positionX": "30",
            "positionY": "30"
        },
        {
            "name": "Google",
            "label": "Google",
            "type": "target",
            "category": "target",
            "image": "http://www.about-searchengines.com/_/rsrc/1375438908754/home/google-g-logo-s.png",
            "nodeId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39",
            "fields": [
                {
                    "name": "id",
                    "required": "true"
                },
                {
                    "name": "title",
                    "required": "true"
                },
                {
                    "name": "description",
                    "required": "false"
                },
                {
                    "name": "google_product_category",
                    "required": "false"
                },
                {
                    "name": "product_type",
                    "required": "false"
                },
                {
                    "name": "link",
                    "required": "false"
                },
                {
                    "name": "image_link",
                    "required": "false"
                },
                {
                    "name": "price",
                    "required": "false"
                },
                {
                    "name": "condition",
                    "required": "false"
                },
                {
                    "name": "availability",
                    "required": "false"
                },
                {
                    "name": "brand",
                    "required": "false"
                },
                {
                    "name": "gtin",
                    "required": "false"
                },
                {
                    "name": "mpn",
                    "required": "false"
                },
                {
                    "name": "item_group_id",
                    "required": "false"
                },
                {
                    "name": "additional_image_link",
                    "required": "false"
                },
                {
                    "name": "sale_price",
                    "required": "false"
                },
                {
                    "name": "sale_price_effective_date",
                    "required": "false"
                },
                {
                    "name": "gender",
                    "required": "false"
                },
                {
                    "name": "age_group",
                    "required": "false"
                },
                {
                    "name": "color",
                    "required": "false"
                },
                {
                    "name": "size",
                    "required": "false"
                },
                {
                    "name": "material",
                    "required": "false"
                },
                {
                    "name": "pattern",
                    "required": "false"
                },
                {
                    "name": "shipping_weight",
                    "required": "false"
                },
                {
                    "name": "adwords_grouping",
                    "required": "false"
                },
                {
                    "name": "adwords_labels",
                    "required": "false"
                },
                {
                    "name": "excluded_destination",
                    "required": "false"
                },
                {
                    "name": "online_only",
                    "required": "false"
                },
                {
                    "name": "expiration_date",
                    "required": "false"
                },
                {
                    "name": "adwords_redirect",
                    "required": "false"
                },
                {
                    "name": "adult",
                    "required": "false"
                },
                {
                    "name": "multipack",
                    "required": "false"
                }
            ],
            "positionX": "239",
            "positionY": "23"
        }
    ]
    }
    var toolData3 =  {
        "name" : "google",
        "nodes" : [
            {
                "positionY" : "30",
                "positionX" : "30",
                "isCoreNode" : "true",
                "fields" : [
                    {
                        "required" : "false",
                        "name" : "field1"
                    },
                    {
                        "required" : "false",
                        "name" : "field2"
                    },
                    {
                        "required" : "false",
                        "name" : "field3"
                    }
                ],
                "nodeId" : "File_d4192cd3-3cf0-6826-097a-30df7f30b637",
                "schema" : {
                    "properties" : {
                        "type" : {
                            "required" : "true",
                            "enum" : [
                                "csv",
                                "tab"
                            ],
                            "title" : "FileType",
                            "type" : "string"
                        },
                        "selectFile" : {
                            "format" : "uri",
                            "type" : "string"
                        }
                    },
                    "type" : "object"
                },
                "image" : "http://www.knowledgebase-script.com/kb/assets/file-txt.png",
                "category" : "source",
                "type" : "source",
                "label" : "File",
                "name" : "File"
            },
            {
                "positionY" : "30",
                "positionX" : "450",
                "isCoreNode" : "true",
                "fields" : [
                    {
                        "required" : "true",
                        "name" : "id"
                    },
                    {
                        "required" : "true",
                        "name" : "title"
                    },
                    {
                        "required" : "false",
                        "name" : "description"
                    },
                    {
                        "required" : "false",
                        "name" : "google_product_category"
                    },
                    {
                        "required" : "false",
                        "name" : "product_type"
                    },
                    {
                        "required" : "false",
                        "name" : "link"
                    },
                    {
                        "required" : "false",
                        "name" : "image_link"
                    },
                    {
                        "required" : "false",
                        "name" : "price"
                    },
                    {
                        "required" : "false",
                        "name" : "condition"
                    },
                    {
                        "required" : "false",
                        "name" : "availability"
                    },
                    {
                        "required" : "false",
                        "name" : "brand"
                    },
                    {
                        "required" : "false",
                        "name" : "gtin"
                    },
                    {
                        "required" : "false",
                        "name" : "mpn"
                    },
                    {
                        "required" : "false",
                        "name" : "item_group_id"
                    },
                    {
                        "required" : "false",
                        "name" : "additional_image_link"
                    },
                    {
                        "required" : "false",
                        "name" : "sale_price"
                    },
                    {
                        "required" : "false",
                        "name" : "sale_price_effective_date"
                    },
                    {
                        "required" : "false",
                        "name" : "gender"
                    },
                    {
                        "required" : "false",
                        "name" : "age_group"
                    },
                    {
                        "required" : "false",
                        "name" : "color"
                    },
                    {
                        "required" : "false",
                        "name" : "size"
                    },
                    {
                        "required" : "false",
                        "name" : "material"
                    },
                    {
                        "required" : "false",
                        "name" : "pattern"
                    },
                    {
                        "required" : "false",
                        "name" : "shipping_weight"
                    },
                    {
                        "required" : "false",
                        "name" : "adwords_grouping"
                    },
                    {
                        "required" : "false",
                        "name" : "adwords_labels"
                    },
                    {
                        "required" : "false",
                        "name" : "excluded_destination"
                    },
                    {
                        "required" : "false",
                        "name" : "online_only"
                    },
                    {
                        "required" : "false",
                        "name" : "expiration_date"
                    },
                    {
                        "required" : "false",
                        "name" : "adwords_redirect"
                    },
                    {
                        "required" : "false",
                        "name" : "adult"
                    },
                    {
                        "required" : "false",
                        "name" : "multipack"
                    }
                ],
                "nodeId" : "Google_c93bc820-bc57-7be9-eebe-5375bd7450e3",
                "image" : "http://www.about-searchengines.com/_/rsrc/1375438908754/home/google-g-logo-s.png",
                "category" : "target",
                "type" : "target",
                "label" : "Google",
                "name" : "Google"
            },
            {
                "positionY" : "29",
                "positionX" : "203",
                "nodeId" : "Replace_61860c2f-bfb3-9ce8-6bbe-e2077461fd61",
                "data" : {
                    "newValue" : "test",
                    "searchValue" : "sss"
                },
                "schema" : {
                    "required" : "false",
                    "properties" : {
                        "newValue" : {
                            "required" : "false",
                            "title" : "newValue",
                            "type" : "string"
                        },
                        "searchValue" : {
                            "required" : "false",
                            "title" : "searchValue",
                            "type" : "string"
                        }
                    },
                    "type" : "object"
                },
                "image" : "http://www.knowledgebase-script.com/kb/assets/file-txt.png",
                "category" : "transformation",
                "type" : "transformation",
                "label" : "Replace",
                "name" : "Replace"
            },
            {
                "positionY" : "27",
                "positionX" : "383",
                "nodeId" : "SubString_a552fc49-9540-18df-cefb-31c8bae9f910",
                "data" : {
                    "endIndex" : "2",
                    "startIndex" : "1"
                },
                "schema" : {
                    "required" : "false",
                    "properties" : {
                        "endIndex" : {
                            "required" : "false",
                            "title" : "end",
                            "type" : "number"
                        },
                        "startIndex" : {
                            "required" : "false",
                            "title" : "start",
                            "type" : "number"
                        }
                    },
                    "type" : "object"
                },
                "image" : "http://www.knowledgebase-script.com/kb/assets/file-txt.png",
                "category" : "transformation",
                "type" : "transformation",
                "label" : "SubString",
                "name" : "SubString"
            }
        ],
        "canvas" : {
            "connections" : [
                {
                    "anchors" : [
                        [
                            "1",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ]
                    ],
                    "pageTargetId" : "Replace_61860c2f-bfb3-9ce8-6bbe-e2077461fd61_default",
                    "pageSourceId" : "File_d4192cd3-3cf0-6826-097a-30df7f30b637_field1",
                    "connectionId" : "con_115"
                },
                {
                    "anchors" : [
                        [
                            "1",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ]
                    ],
                    "pageTargetId" : "SubString_a552fc49-9540-18df-cefb-31c8bae9f910_default",
                    "pageSourceId" : "Replace_61860c2f-bfb3-9ce8-6bbe-e2077461fd61_default",
                    "connectionId" : "con_132"
                },
                {
                    "anchors" : [
                        [
                            "1",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ]
                    ],
                    "pageTargetId" : "Google_c93bc820-bc57-7be9-eebe-5375bd7450e3_id",
                    "pageSourceId" : "SubString_a552fc49-9540-18df-cefb-31c8bae9f910_default",
                    "connectionId" : "con_136"
                }
            ],
            "nodes" : [
                {
                    "positionY" : "30",
                    "positionX" : "30",
                    "nodeName" : "File",
                    "nodeId" : "File_d4192cd3-3cf0-6826-097a-30df7f30b637"
                },
                {
                    "positionY" : "30",
                    "positionX" : "599",
                    "nodeName" : "Google",
                    "nodeId" : "Google_c93bc820-bc57-7be9-eebe-5375bd7450e3"
                },
                {
                    "positionY" : "28",
                    "positionX" : "181",
                    "nodeName" : "Replace",
                    "nodeId" : "Replace_61860c2f-bfb3-9ce8-6bbe-e2077461fd61"
                },
                {
                    "positionY" : "29",
                    "positionX" : "383",
                    "nodeName" : "SubString",
                    "nodeId" : "SubString_a552fc49-9540-18df-cefb-31c8bae9f910"
                }
            ]
        },
        "settings" : null
    }


    describe('parseField',function(){

        it('should parse field',function(){
            var field = 'File_canscncnnkn_field1'
            var result = processorService.parseField(field);
            expect(result).to.be.an('object');
            expect(Object.keys(result).length).to.equal(3)
            expect(result['nodeId']).to.equal('File_canscncnnkn');
            expect(result['nodeName']).to.equal('File')
            expect(result['fieldName']).to.equal('field1')

        })

        it('should parse field',function(){
            var field = 'File_canscncnnkn_product_type';
            var result = processorService.parseField(field);
            expect(result).to.be.an('object');
            expect(Object.keys(result).length).to.equal(3)
            expect(result['nodeId']).to.equal('File_canscncnnkn');
            expect(result['nodeName']).to.equal('File')
            expect(result['fieldName']).to.equal('product_type')
        })

    })

    describe('getMappingsRecursive',function(){

        it('one to one mapping , no transform',function(){
            var connections = [
                {
                    "connectionId": "con_112",
                    "pageSourceId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e_ProductId",
                    "pageTargetId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39_id",
                    "anchors": [
                        [
                            "1",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ]
                    ]
                }
            ]
            var result = processorService.getMappingsRecursive(connections,{},0,'id',null)
            expect(result).to.be.an('object');
            expect(Object.keys(result).length).to.equal(1);
        })

        it('multiple mapping , one transform',function(){
            var connections = [
                {
                    "connectionId": "con_112",
                    "pageSourceId": "File_4x8cb386-897f-4aed-dead-707a2229ec4e_ProductId",
                    "pageTargetId": "Replace_3a8cb386-897f-4aed-dead-707a2229ec4e",
                    "anchors": [
                        [
                            "1",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ]
                    ]
                },
                {
                    "connectionId": "con_112",
                    "pageSourceId": "Replace_3a8cb386-897f-4aed-dead-707a2229ec4e",
                    "pageTargetId": "Google_20e10b70-b014-363d-29a3-9579a67b7d39_id",
                    "anchors": [
                        [
                            "1",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ]
                    ]
                }
            ]
            var result = processorService.getMappingsRecursive(connections,{},0,'id',null)
            expect(result).to.be.an('object');
            expect(Object.keys(result).length).to.equal(2);
        })

        it('three stage mapping',function(){
            var connections = [
                {
                    "anchors" : [
                        [
                            "1",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ]
                    ],
                    "pageTargetId" : "Replace_61860c2f-bfb3-9ce8-6bbe-e2077461fd61_default",
                    "pageSourceId" : "File_d4192cd3-3cf0-6826-097a-30df7f30b637_field1",
                    "connectionId" : "con_115"
                },
                {
                    "anchors" : [
                        [
                            "1",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ]
                    ],
                    "pageTargetId" : "SubString_a552fc49-9540-18df-cefb-31c8bae9f910_default",
                    "pageSourceId" : "Replace_61860c2f-bfb3-9ce8-6bbe-e2077461fd61_default",
                    "connectionId" : "con_132"
                },
                {
                    "anchors" : [
                        [
                            "1",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0.5",
                            "0",
                            "0",
                            "0",
                            "0"
                        ]
                    ],
                    "pageTargetId" : "Google_c93bc820-bc57-7be9-eebe-5375bd7450e3_id",
                    "pageSourceId" : "SubString_a552fc49-9540-18df-cefb-31c8bae9f910_default",
                    "connectionId" : "con_136"
                }
            ];
            var result = processorService.getMappingsRecursive(connections,{},0,'id',null)
            //console.log('result',result)
            expect(result).to.be.an('object');
            expect(Object.keys(result).length).to.equal(3);

        })


    })

    describe('destinationFieldMappings',function(){

        it('should return two mapped fields from toolData',function(){
            var mappedFields = processorService.destinationFieldMappings(toolData)
            expect(mappedFields).to.be.an('object');
            expect(Object.keys(mappedFields).length).to.equal(2);
            expect(mappedFields).to.have.property('id')
            expect(mappedFields).to.have.property('link')
            //console.log(processorService.destinationFieldMappings(toolData))
        })

        it('should return five mapped fields from toolData2',function(){
            var mappedFields = processorService.destinationFieldMappings(toolData2)
            expect(mappedFields).to.be.an('object');
            expect(Object.keys(mappedFields).length).to.equal(5);
            expect(mappedFields).to.have.property('id')
            expect(mappedFields).to.have.property('title')
            expect(mappedFields).to.have.property('description')
            expect(mappedFields).to.have.property('google_product_category')
            expect(mappedFields).to.have.property('product_type')
        })

        it('should return 1 mapped fields from toolData3',function(){
            var mappedFields = processorService.destinationFieldMappings(toolData3)
            //console.log(mappedFields)
            expect(mappedFields).to.be.an('object');
            expect(Object.keys(mappedFields).length).to.equal(1);
            expect(mappedFields).to.have.property('id')
        })

    })

    xdescribe('generateStatistics',function(){
        var rows = [
            {
                "id": "121hhc",
                "title": "cscascas",
                "description": "ncascas",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 6",
                        "property": "@.id"
                    },
                    {
                        "code": null,
                        "message": "must be shorter than 5 elements, but it has 8",
                        "property": "@.title"
                    }
                ]
            },
            {
                "id": "12ed",
                "title": "e1e12",
                "description": "e12e21",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 4",
                        "property": "@.id"
                    }
                ]
            },
            {
                "id": "121hhc",
                "title": "cscascas",
                "description": "ncascas",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 6",
                        "property": "@.id"
                    },
                    {
                        "code": null,
                        "message": "must be shorter than 5 elements, but it has 8",
                        "property": "@.title"
                    }
                ]
            },
            {
                "id": "12ed",
                "title": "e1e12",
                "description": "e12e21",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 4",
                        "property": "@.id"
                    }
                ]
            },
            {
                "id": "121hhc",
                "title": "cscascas",
                "description": "ncascas",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 6",
                        "property": "@.id"
                    },
                    {
                        "code": null,
                        "message": "must be shorter than 5 elements, but it has 8",
                        "property": "@.title"
                    }
                ]
            },
            {
                "id": "12ed",
                "title": "e1e12",
                "description": "e12e21",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 4",
                        "property": "@.id"
                    }
                ]
            },
            {
                "id": "121hhc",
                "title": "cscascas",
                "description": "ncascas",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 6",
                        "property": "@.id"
                    },
                    {
                        "code": null,
                        "message": "must be shorter than 5 elements, but it has 8",
                        "property": "@.title"
                    }
                ]
            },
            {
                "id": "12ed",
                "title": "e1e12",
                "description": "e12e21",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 4",
                        "property": "@.id"
                    }
                ]
            },
            {
                "id": "121hhc",
                "title": "cscascas",
                "description": "ncascas",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 6",
                        "property": "@.id"
                    },
                    {
                        "code": null,
                        "message": "must be shorter than 5 elements, but it has 8",
                        "property": "@.title"
                    }
                ]
            },
            {
                "id": "12ed",
                "title": "e1e12",
                "description": "e12e21",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 4",
                        "property": "@.id"
                    }
                ]
            }
        ];
        var stats = [ [ 'Record', 'Valid', 'Invalid' ],
            [ 'id', 0, 10 ],
            [ 'title', 5, 5 ],
            [ 'description', 10, 0 ],
            [ 'isValid', 10, 0 ],
            [ 'message', 10, 0 ] ]
        it('return valid stats',function(){
            var result = processorService.generateStatistics(rows);
            expect(result).to.deep.equal(stats)
        })

    })

    describe('reformatErrorMessage',function(){
        var rows = [
            {
                "id": "121hhc",
                "title": "cscascas",
                "description": "ncascas",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 6",
                        "property": "@.id"
                    },
                    {
                        "code": null,
                        "message": "must be shorter than 5 elements, but it has 8",
                        "property": "@.title"
                    }
                ]
            },
            {
                "id": "12ed",
                "title": "e1e12",
                "description": "e12e21",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 4",
                        "property": "@.id"
                    }
                ]
            },
            {
                "id": "121hhc",
                "title": "cscascas",
                "description": "ncascas",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 6",
                        "property": "@.id"
                    },
                    {
                        "code": null,
                        "message": "must be shorter than 5 elements, but it has 8",
                        "property": "@.title"
                    }
                ]
            },
            {
                "id": "12ed",
                "title": "e1e12",
                "description": "e12e21",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 4",
                        "property": "@.id"
                    }
                ]
            },
            {
                "id": "121hhc",
                "title": "cscascas",
                "description": "ncascas",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 6",
                        "property": "@.id"
                    },
                    {
                        "code": null,
                        "message": "must be shorter than 5 elements, but it has 8",
                        "property": "@.title"
                    }
                ]
            },
            {
                "id": "12ed",
                "title": "e1e12",
                "description": "e12e21",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 4",
                        "property": "@.id"
                    }
                ]
            },
            {
                "id": "121hhc",
                "title": "cscascas",
                "description": "ncascas",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 6",
                        "property": "@.id"
                    },
                    {
                        "code": null,
                        "message": "must be shorter than 5 elements, but it has 8",
                        "property": "@.title"
                    }
                ]
            },
            {
                "id": "12ed",
                "title": "e1e12",
                "description": "e12e21",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 4",
                        "property": "@.id"
                    }
                ]
            },
            {
                "id": "121hhc",
                "title": "cscascas",
                "description": "ncascas",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 6",
                        "property": "@.id"
                    },
                    {
                        "code": null,
                        "message": "must be shorter than 5 elements, but it has 8",
                        "property": "@.title"
                    }
                ]
            },
            {
                "id": "12ed",
                "title": "e1e12",
                "description": "e12e21",
                "isValid": false,
                "message": [
                    {
                        "code": null,
                        "message": "must be shorter than 2 elements, but it has 4",
                        "property": "@.id"
                    }
                ]
            }
        ];
        it('reformat error messages as ',function(){
            processorService.reformatErrorMessage(rows)
        })
    })

    describe('transformEachRow',function(){
        var mappings1 = { id:
        { '0':
        { nodeId: 'File_3a8cb386-897f-4aed-dead-707a2229ec4e',
            nodeName: 'File',
            fieldName: 'ProductId' } },
            link:
            { '0':
            { nodeId: 'File_3a8cb386-897f-4aed-dead-707a2229ec4e',
                nodeName: 'File',
                fieldName: 'ProductId' } } }
        var mappings2  = { id:
        { '0':
        { nodeId: 'File_3a8cb386-897f-4aed-dead-707a2229ec4e',
            nodeName: 'File',
            fieldName: 'ProductId' } },
            title:
            { '0':
            { nodeId: 'File_3a8cb386-897f-4aed-dead-707a2229ec4e',
                nodeName: 'File',
                fieldName: 'Desc' } },
            description:
            { '0':
            { nodeId: 'File_3a8cb386-897f-4aed-dead-707a2229ec4e',
                nodeName: 'File',
                fieldName: 'Details' } },
            google_product_category:
            { '0':
            { nodeId: 'File_3a8cb386-897f-4aed-dead-707a2229ec4e',
                nodeName: 'File',
                fieldName: 'MPN' } },
            product_type:
            { '0':
            { nodeId: 'File_3a8cb386-897f-4aed-dead-707a2229ec4e',
                nodeName: 'File',
                fieldName: 'Color' } } }
        var mappings3 = {
            id: { '0':
                   { nodeId: 'SubString_a552fc49-9540-18df-cefb-31c8bae9f910',
                    nodeName: 'SubString',
                    fieldName: 'default' },
                    '1':
                    { nodeId: 'Replace_61860c2f-bfb3-9ce8-6bbe-e2077461fd61',
                        nodeName: 'Replace',
                        fieldName: 'default' },
                    '2':
                    { nodeId: 'File_d4192cd3-3cf0-6826-097a-30df7f30b637',
                        nodeName: 'File',
                        fieldName: 'ProductId' } }
        }

        it('should return output field with id property only',function(){
            var row = { ProductId: '12ed',
                Desc: 'e1e12',
                Details: 'e12e21',
                MPN: 'cc',
                Color: 'blue' }
            var output = processorService.transformEachRow(toolData,mappings1,row);
            expect(output).to.be.an('object');
            expect(output).to.have.property('id');
            expect(output['id']).to.equal('12ed');
            expect(output).to.have.property('link');
            expect(output['link']).to.equal('12ed');

        })

        it('should transform into a valid row',function(){
            var row = { ProductId: '12ed',
                Desc: 'e1e12',
                Details: 'e12e21',
                MPN: 'cc',
                Color: 'blue' }
            var output = processorService.transformEachRow(toolData2,mappings2,row);
            expect(output).to.be.an('object');
            expect(output).to.have.property('id');
            expect(output['id']).to.equal('12ed');
            expect(output).to.have.property('title');
            expect(output['title']).to.equal('e1e12');
            expect(output).to.have.property('description');
            expect(output['description']).to.equal('e12e21');
            expect(output).to.have.property('google_product_category');
            expect(output['google_product_category']).to.equal('cc');
            expect(output).to.have.property('product_type');
            expect(output['product_type']).to.equal('blue');

        })

        it('should process replace and substring transforms',function(){
            var row = { ProductId: '12ed',
                Desc: 'e1e12',
                Details: 'e12e21',
                MPN: 'cc',
                Color: 'blue' }
            var output = processorService.transformEachRow(toolData3,mappings3,row);
            console.log(output)
            expect(output).to.be.an('object');
            expect(output).to.have.property('id');
            expect(output['id']).to.equal('2');
        })
    })


})