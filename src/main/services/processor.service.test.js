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

    })

    describe('destinationFieldMappings',function(){

        it('should return two mapped fields',function(){
            var mappedFields = processorService.destinationFieldMappings(toolData)
            expect(mappedFields).to.be.an('object');
            expect(Object.keys(mappedFields).length).to.equal(2);
            expect(mappedFields).to.have.property('id')
            expect(mappedFields).to.have.property('link')
            //console.log(processorService.destinationFieldMappings(toolData))
        })

        it('should return five mapped fields',function(){
            var mappedFields = processorService.destinationFieldMappings(toolData2)
            expect(mappedFields).to.be.an('object');
            expect(Object.keys(mappedFields).length).to.equal(5);
            expect(mappedFields).to.have.property('id')
            expect(mappedFields).to.have.property('title')
            expect(mappedFields).to.have.property('description')
            expect(mappedFields).to.have.property('google_product_category')
            expect(mappedFields).to.have.property('product_type')
        })

    })

    describe('transformEachRow',function(){
        var mappings1 ={ id:
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
        it('should return output field with id property only',function(){
            var row = { ProductId: '12ed',
                Desc: 'e1e12',
                Details: 'e12e21',
                MPN: 'cc',
                Color: 'blue' }
            var output = processorService.transformEachRow(mappings1,row);
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
            var output = processorService.transformEachRow(mappings2,row);
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
    })
})