var path  = require('path');
var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');

/**
 * Should return something like this
 var mappings = {
    "field1" : [
        {nodeId:"xxxx",field:"sccsa"},
        {nodeId:"transform"}
    ],
    "field2" : [
        {nodeId:"xxxx",field:"sccsa"},
        {nodeId:"transform"}
    ]
}
 * @param connections
 * @returns {{}}
 */
function getFieldMappings(toolData,fieldName){
    var fieldMapping = {
        transformations:[],
        destination:null
    }
    toolData.canvas.connections.forEach(function(c){
        var source = parseField(c["pageSourceId"]);
        var target = parseField(c["pageTargetId"]);
        if(source.fieldName == fieldName){
            var node = getNodePropertyById(toolData,target.nodeId);
            if (node['category'] === 'transform'){
               fieldMapping['transformation'].push(target.nodeId);
            }
            if (node['category'] === 'target') {
                fieldMapping['destination'] = target.fieldName;
            }
        }
    })
    return fieldMapping;
}

function getMappingsRecursive(connections,mappings,i,destinationFieldName,nodeId){
     //console.log('checking for',destinationFieldName)
     connections.forEach(function(c){
        var source =  parseField(c["pageSourceId"]);
        var target = parseField(c["pageTargetId"]);
        if((target.fieldName && target.fieldName === destinationFieldName) || target.nodeId == nodeId){
            mappings[i] = source;
            return getMappingsRecursive(connections,mappings,i+1,null,source.nodeId)
        }
        else {
            return ;
        }
    })
    return mappings
}



function getNodePropertyById(toolData,nodeId){
    var node = _.find(toolData.nodes,function(n){
        return n.nodeId === nodeId
    })
    return node;
}

/**
 * Parse nodename and field name from field string
 * @param field
 * @returns {{nodeName: *, fieldName: *}}
 */
function parseField(field){
    var fieldParts = field.split('_');
    return {
        nodeId:fieldParts[0] + '_' + fieldParts[1],
        nodeName:fieldParts[0],
        fieldName:(fieldParts.slice(2)).join('_')
    }
}

//function getMappedFieldsByNode(connections,nodeName){
//    var fieldsMapped = {};
//    connections.forEach(function(c){
//        var sourceParts = c["pageSourceId"].split('_');
//        var sourceComponentName = sourceParts[0];
//        var sourceFieldName = sourceParts[2];
//        if (sourceComponentName === nodeName){
//            fieldsMapped[sourceFieldName] = [];
//            var destinationParts = c["pageTargetId"].split('_');
//            var destinationComponentName = destinationParts[0];
//            var destinationFieldName = destinationParts[2];
//
//        }
//    });
//    return fieldsMapped;
//}

/**
 * Returns list of fields from source file component
 * @param toolData
 */
function sourceFields(toolData){
    var fields = [];
    var fileNode = _.find(toolData.nodes,function(n){
        return (n.name === 'File')
    })
    fileNode.fields.forEach(function(f){
        fields.push(f.name)
    })
    return fields;
}

/**
 * Process Each row, apply all intermediate tranformation logic and convert to final schema nameß
 */
function transformEachRow(toolData,row){
    // only pass fields for which there is a  destination mapping
    // out header name should correspond to destination connector name
    var outputRow = {}
    var destinationFieldsThatAreMapped = {}
    var destinationFields = _.find(toolData.nodes,function(n){
        return n.type === 'target'
    }).fields.map(function(f){return f.name})
    destinationFields.forEach(function(f){
        var mappings = getMappingsRecursive(toolData.canvas.connections,{},0,f,null);
        //console.log('checking for',f,mappings)
        if (Object.keys(mappings).length > 0){
            destinationFieldsThatAreMapped[f] = mappings
        }
    })
    //console.log('destination fields mapped',destinationFieldsThatAreMapped)
    for (var key in destinationFieldsThatAreMapped){
        outputRow[key] = getOutputValue(toolData,row,destinationFieldsThatAreMapped[key])
    }
    return outputRow

}

function getOutputValue(toolData,row,mappings){
      return row[mappings[0]['fieldName']]
}

function analyze(toolData,userData,cb){
    console.log('===============')
    console.log('toolData',JSON.stringify(toolData,null,4));
    var directory = path.join(root.driveRoot,userData.id) ;
    var fileNode = _.find(toolData.nodes,function(n){
        return n.name === 'File'
    })
    var inputFileFullName = path.join(directory, fileNode.fileName) ;
    var outputRows = []
    console.log('inputFileFullName',inputFileFullName)
    var inputStream = fs.createReadStream(inputFileFullName);
    inputStream.pipe(csv.parse({ columns: true }))
        .pipe(csv.transform(function (row, next) {
            //console.log('row',row)
            //next(null,row);
            next(null,transformEachRow(toolData,row))
            // transformEachRow(toolData,row, mappings, function (err, outRow) {
            //     next(null,outRow)
            // });
        }))
        //.pipe(csv.stringify({ header: true }))
        .on("data", function(data){
            outputRows.push(data)
        })
        .on("end", function(){
            console.log("Final data",outputRows)
            cb(null,outputRows)
        });

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

module.exports.sourceFields = sourceFields;
module.exports.getNodePropertyById =  getNodePropertyById;
module.exports.getFieldMappings = getFieldMappings;
module.exports.transformEachRow  = transformEachRow;
module.exports.getMappingsRecursive = getMappingsRecursive;
module.exports.parseField = parseField;
module.exports.analyze = analyze;