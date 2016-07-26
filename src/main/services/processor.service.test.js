/**
 * Created by saurabhbansal on 7/20/16.
 */
var processorService = require('./processor.service');
var expect = require('chai').expect;


describe('processor.service',function(){

    describe('getFieldsMapping',function(){

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
})