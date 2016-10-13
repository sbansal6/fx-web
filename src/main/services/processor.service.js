var inspector = require('schema-inspector');
var async = require('async');
var path  = require('path');
var fs = require('fs');
var csv = require('csv');
var _ = require('underscore');
var nodeService = require('./node.service');

/**
 * Return mapping path for each destination field if mapped
 */
function destinationFieldMappings(toolData){
    var mappedFields = {};
    var destinationFields = getTargetConnector(toolData).fields.map(function(f){return f.name})
    destinationFields.forEach(function(f){
        var mappings = getMappingsRecursive(toolData.canvas.connections,{},0,f,null);
        if (Object.keys(mappings).length > 0){
            mappedFields[f] = mappings
        }
    })
    return mappedFields;
}


/**
 * Return the target connector in this flow, Google |  Facebook | Bing
 * @param toolData
 */
function getTargetConnector(toolData){
    return _.find(toolData.nodes,function(n){
        return n.type === 'target'
    })
}

function getOutputValue(toolData,row,mappings){
    var keys = Object.keys(mappings);
    var keysSortedDesc = keys.sort(function(a, b){return b-a});
    var sourceNode = mappings[keysSortedDesc[0]];
    var sourceFieldValue = row[sourceNode["fieldName"]];

    if (keysSortedDesc.length > 1) {
       var leftKeysAfterSource = keysSortedDesc.slice(1)
       leftKeysAfterSource.forEach(function(key){
           var nodeAtKey = mappings[key];
           var nodeReturn = outputFromTransformNode(toolData,sourceFieldValue,nodeAtKey);
           sourceFieldValue = nodeReturn;

       })
       return sourceFieldValue

    } else {
        return sourceFieldValue
    }
}

function outputFromTransformNode(toolData,input,node){
    var actualNode = _.find(toolData.nodes,function(n){
        return n.nodeId === node.nodeId
    })
    if (actualNode.name === 'Replace'){
        if (actualNode.data){
            return input.replace(actualNode.data["searchValue"] || "",actualNode.data["newValue"] || "")
        } else {
            return input;
        }
    }
    if (actualNode.name === 'SubString'){
        return input.substring(actualNode.data["startIndex"],actualNode.data["endIndex"])
    }
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

/**
 * Process Each row, apply all intermediate tranformation logic and convert to final schema nameß
 */
function transformEachRow(toolData,destinationFieldMapping,row){
    //console.log('incoming mappings',destinationFieldMapping);
    //console.log('row',row)
    // only pass fields for which there is a  destination mapping
    // out header name should correspond to destination connector name
    var outputRow = {}
     for (var key in destinationFieldMapping){
        outputRow[key] = getOutputValue(toolData,row,destinationFieldMapping[key])
    }
    return outputRow
}

function sanitizeRow(sanitizationSchema,row){
    var sanitizedRow = inspector.sanitize(sanitizationSchema, row)
    // can parse more info from message if needed. santized row has message
    return sanitizedRow.data;
}

/** Should return statistics in following format
 * [
 *   ['Record', 'Valid', 'Invalid'],
     ['Id', 1000, 2000],
     ['Title', 500, 2500],
     ['Description', 700, 2300],
     ['Google Product Category', 600, 2400],
     ['Product Type', 1000, 2000]
 * ]
 */
function generateStatistics(rows){
    //console.log('rows',rows)
    var stats = [];
    stats.push(['Record','Valid','Invalid'])
    var fields = {};
    for ( var key in rows[0]){
        if ( (key !== 'isValid') && (key !== 'message') ){
            fields[key] = {invalid:0};
        }
    }
    var totalRowCount = 0;
    rows.forEach(function(r){
        totalRowCount++;
        r.message.forEach(function(mr){
            var fieldName = mr.property.substring(2)
            if (fields[fieldName]) {
                fields[fieldName].invalid ++
            }
            // if field doesn't exist in fields table
            // this happens for required fields that are not mapped
            else {
                fields[fieldName] = {"invalid":1}
            }

        })
    })
    for (var key in fields){
        stats.push([key,totalRowCount-fields[key].invalid,fields[key].invalid])
    }
    return stats;
}

/**
 * Convert message to html tooltip ready format
 */
function reformatErrorMessage(outputRows){
    outputRows.forEach(function(r){
        var stringMessage = [];
        r.message.forEach(function(em){
            stringMessage.push(em.property.substring(2) + ' :- ' + em.message) ;
        });
        r.message = stringMessage.join('&#013');
    });
    return outputRows;
}

/**
 * Validate a row as per schema and append validation result to row
 * @param validationSchema
 * @param row
 */
function validateRow(validationSchema,row){
    //console.log('validateRow',validationSchema,row)
    var validationResult = inspector.validate(validationSchema,row)
    row.isValid = validationResult['valid'];
    row.message = validationResult['error'];
    return row;
}

function analyze(toolData,userData,cb){
    console.log('===============analyzing===================')
    //console.log('toolData',JSON.stringify(toolData,null,4))
    var outputRows = [];
    var targetConnectorName =  getTargetConnector(toolData).name;
    var directory = path.join(root.driveRoot,userData.id) ;
    var fileNode = _.find(toolData.nodes,function(n){
        return n.name === 'File'
    });
    var fileType = fileNode.data.type ;
    var delimiter = fileType == 'csv' ? ',' : '\t';
    var inputFileFullName = path.join(directory, fileNode.fileName) ;
    var inputStream = fs.createReadStream(inputFileFullName);
    var destinationFieldMapping = destinationFieldMappings(toolData);
    var santizeSchema = nodeService.getNodeSanitizeSchema(targetConnectorName);
    var validateSchema = nodeService.getNodeValidationSchema(targetConnectorName);
    inputStream.pipe(csv.parse({ columns: true,delimiter:delimiter }))
        .pipe(csv.transform(function (row, next) {
            async.waterfall([
                function(transformCb){
                   transformCb(null,transformEachRow(toolData,destinationFieldMapping,row));
                },
                function(row,cb){
                    cb(null,row)
                }
                ,
                function(row,santizeCb){
                    santizeCb(null,sanitizeRow(santizeSchema,row));
                }
                ,
                function(row,validateCb){
                    validateCb(null,validateRow(validateSchema,row));
                }
            ],function(err,row){
                next(null,row)
            })
        }))
        .on("data", function(data){
            outputRows.push(data)
        })
        .on("end", function(){
            var output = {};
            output.stats = generateStatistics(outputRows);
            //console.log('stats',output.stats);
            output.outputRows = reformatErrorMessage(outputRows);
            cb(null,output)
        });
}

module.exports.destinationFieldMappings = destinationFieldMappings
module.exports.transformEachRow  = transformEachRow;
module.exports.getMappingsRecursive = getMappingsRecursive;
module.exports.parseField = parseField;
module.exports.analyze = analyze;
module.exports.generateStatistics = generateStatistics;
module.exports.reformatErrorMessage = reformatErrorMessage;