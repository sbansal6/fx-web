var path  = require('path');
var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');


function getFieldsMapping(connections){
    var mappings = {};
    connections.forEach(function(link){
        mappings[link["pageSourceId"]] = link["pageTargetId"]
    })
    return mappings;
}


function process(toolData,userData){
    console.log('toolData',toolData);
    console.log('userData',userData)
}


/**
 * Processor object/class is responsible for processing the model
 * params:-
 *   model : object : required
 *   options : object : optional
 *     {
 *      userProfile : "",
 *      executionId : ""
 *     }
 */
var Processor = function(model,options){
    if (!model){
        // log here
        throw new Error("model is a required constructor argument")
    }

    /**
     * Source component object from model
     */
    var sourceComponent  =  getItem(model.nodeDataArray,{key: 'Source'});

    /**
     * Merchant Connector Object
     * This can be extracted from model or if object grows big in future
     *      get it from components library
     */
    var merchantConnector  = getItem(model.nodeDataArray,{key: 'Google'});

    var mappings = getFieldsMapping();

    /**
     * Get mapped key if exists
     */
    function getMappedKey(key,mapping){
        if (mapping.hasOwnProperty(key)) {
            return mapping[key];
        } else {
            return false;
        }

    }

    /**
     * Process Each row
     */
    function transformEachRow(row,mappings,transformEachRowCb){
        // only pass fields for which there is a  destination mapping
        // out header name should correspond to destination connector name
        var outputRow = {}
        var mappedKey ;
        for (var fieldKey in row){
            mappedKey = getMappedKey(fieldKey,mappings);
            if (mappedKey){
                outputRow[mappedKey] = row[fieldKey]
            }
        }
        transformEachRowCb(null,outputRow);
    }


    /**
     * function that actually process input and converts to ouput
     *  1) Reads input line by line
     *  2) ****phase2 applies middleware (cleanup functions) if specified  to each field
     *  3) converts to output field
     *  4) field analysis based on rules (every merchant connector has rules associated with it)
     *
     */
    function process(processCb){
        var directory = options.dir || config.dir ;
        var inputFileFullName = path.join(directory, sourceComponent.fileName) ;
        var inputStream = fs.createReadStream(inputFileFullName);
        var outputStream = []
        var outputFileStream = fs.createWriteStream(inputFileFullName.replace(".csv",".out.csv"));
        var mappings = getFieldsMapping();
        inputStream.pipe(csv.parse({ columns: true }))
            .pipe(csv.transform(function (row, next) {
                transformEachRow(row, mappings, function (err, outRow) {
                    next(null,outRow)
                });
            }))
            //.pipe(csv.stringify({ header: true }))
            .on("data", function(data){
                outputStream.push(data)
            })
            .on("end", function(){
                console.log("Final data",outputStream)
                processCb(null,outputStream)
            });
//        outputStream.on('finish', function () {
//            console.log("output stream is done")
//            processCb(null,null)
//        });
    }

    this.process = process;

    // HELPER FUNCTIONS
    /**
     * Get particalur item from model by keyname and value
     * params :-
     *   source : Array
     *   obj :    Object {key:value}
     *
     * return :-
     *   Object
     */
    function getItem(source,obj){
        var item = _.find(source,function(item){
            var keyName = Object.keys(obj)[0]
            return item[keyName] == obj[keyName]
        })
        return item;
    }

    // END HLEPER FUNCTIONS

    //  this.processFile = function(cb){
    // 	inputStream.pipe(csv.parse({ columns: true }))
    // 		       .pipe(csv.transform(function (row, next) {
    // 		              transformRow(row,  function (err, outRow) {
    // 			                next(null,outRow)
    // 			              });
    // 			            }))
    // 		        .pipe(csv.stringify({ header: true })).pipe(outputStream);
    // 	outputStream.on('finish', function () {
    // 		console.log("output stream is done")
    // 	    cb(null,null)
    // 		 })
    // 	    }

}

module.exports.getFieldsMapping = getFieldsMapping;
module.exports.process = process;