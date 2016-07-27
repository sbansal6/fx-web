/**
 * Created by saurabhbansal on 7/20/16.
 */
var processorService = require('./processor.service');
var expect = require('chai').expect;


describe('processor.service',function(){

    xdescribe('getFieldsMapping',function(){

        var connections  = [
            {
                anchors: [
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
                pageTargetId: "Google_8233e28c-f20a-1b45-e01d-7f197d0c40a3_id",
                pageSourceId: "File_a31ae65e-36a0-bdcc-659f-1a9f3359c648_field1",
                connectionId: "con_109"
            }
        ]

        it('returns one valid mapping',function(){
            var mapping = processorService.getFieldsMapping(connections)
            expect(mapping).to.be.an('object')
            expect(Object.keys(mapping).length).to.equal(1);
            expect(mapping).to.deep.equal({'File_a31ae65e-36a0-bdcc-659f-1a9f3359c648_field1': 'Google_8233e28c-f20a-1b45-e01d-7f197d0c40a3_id' })
        })
    })

    xdescribe('getMappedFieldsByNode',function(){
        var connections  = [
            {
                anchors: [
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
                pageTargetId: "Google_8233e28c-f20a-1b45-e01d-7f197d0c40a3_id",
                pageSourceId: "File_a31ae65e-36a0-bdcc-659f-1a9f3359c648_field1",
                connectionId: "con_109"
            }
        ]

        it('Return one mapped field',function(){
            var fields = processorService.getMappedFieldsByNode(connections,'File');
            expect(fields).to.be.an('array');
            expect(fields.length).to.equal(1);
        })



    })

    describe('sourceFields',function(){
        var toolData =  {
            "name" : "google",
            "nodes" : [
                {
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
                    "nodeId" : "File_9042dca9-36c0-11e2-2e30-f22c07b01e22",
                    "options" : {
                        "form" : {
                            "buttons" : {
                                "submit" : {
                                    "value" : "Submit the Form"
                                }
                            },
                            "attributes" : {
                                "action" : "/upload",
                                "method" : "POST"
                            }
                        },
                        "fields" : {
                            "type" : {
                                "removeDefaultNone" : "true"
                            },
                            "selectFile" : {
                                "type" : "file"
                            }
                        }
                    },
                    "schema" : {
                        "properties" : {
                            "type" : {
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
                    "nodeId" : "Google_7a55048e-d0a3-cf3e-59b1-e2ff2974ff7e",
                    "image" : "http://www.about-searchengines.com/_/rsrc/1375438908754/home/google-g-logo-s.png",
                    "category" : "target",
                    "type" : "target",
                    "label" : "Google",
                    "name" : "Google"
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
                        "pageTargetId" : "Google_7a55048e-d0a3-cf3e-59b1-e2ff2974ff7e_id",
                        "pageSourceId" : "File_9042dca9-36c0-11e2-2e30-f22c07b01e22_field1",
                        "connectionId" : "con_109"
                    }
                ],
                "nodes" : [
                    {
                        "positionY" : "30",
                        "positionX" : "30",
                        "nodeName" : "File",
                        "nodeId" : "File_9042dca9-36c0-11e2-2e30-f22c07b01e22"
                    },
                    {
                        "positionY" : "28",
                        "positionX" : "284",
                        "nodeName" : "Google",
                        "nodeId" : "Google_7a55048e-d0a3-cf3e-59b1-e2ff2974ff7e"
                    }
                ]
            },
            "settings" : null
        }
        it('Should return 3 fields',function(){
            var fields = processorService.sourceFields(toolData);
            expect(fields).to.be.an('array');
            expect(fields.length).to.equal(3)
        })

    })


})