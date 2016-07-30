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
                    "pageSourceId": "File_3a8cb386-897f-4aed-dead-707a2229ec4e_ProuctId",
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
        it('Should return 5 fields',function(){
            var fields = processorService.sourceFields(toolData);
            expect(fields).to.be.an('array');
            expect(fields.length).to.equal(5)
        })
    })

    describe('getFieldMappings',function(){
        it('should return id as destination mapping name',function(){
            var mappings = processorService.getFieldMappings(toolData,'ProuctId')
            expect(mappings).to.be.an('object');
            expect(mappings['transformations']).to.be.an('array');
            expect(mappings['transformations'].length).to.equal(0);
            expect(mappings['destination']).to.equal('id');
        })
    })

    describe('transformEachRow',function(){
        it('should return output field with id property only',function(){
            var row = { ProuctId: '12ed',
                Desc: 'e1e12',
                Details: 'e12e21',
                MPN: 'cc',
                Color: 'blue' }
            var output = processorService.transformEachRow(toolData,row);
            expect(output).to.be.an('object');
            expect(output).to.have.property('id');
            expect(output['id']).to.equal('12ed');
        })
    })




})