var AWS = require('aws-sdk'),
    fs = require('fs'),
    path = require('path');

// http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Disk
AWS.config.loadFromPath('../../../aws-config.json');

// assume you already have the S3 Bucket created, and it is called ierg4210-shopxx-photos
var rootBucket = 'FeedExchange-fs'
var s3 = new AWS.S3({params: {Bucket: 'FeedExchange-fs'}});

function createFolder(userId,cb){
    s3.createBucket({Bucket:path.join(rootBucket,userId)},function(err,data){
        console.log(err)
        console.log("bucket creation: " +err ? "FAIL" : "SUCCESS");
        cb()
    });
}

createFolder('test',function(){})
