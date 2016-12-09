var multer  = require('multer');
var path = require('path');
var _ = require('underscore');
var fs = require('fs');
var sutil = require('line-stream-util')
var csv = require('csv');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, req.user.rootDir);
    },
    filename: function (req, file, cb) {
        var getFileExt = function(fileName){
            var fileExt = fileName.split(".");
            if( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 ) ) {
                return "";
            }
            return fileExt.pop();
        }
        cb(null, file.originalname)
    }
});

var multerUpload = multer({ storage: storage });

var headers = function(req,cb){
    var fullFileName = path.join(req.user.rootDir,req.files[0].originalname);
    var delimiter = req.body.type === 'csv' ? ',' : '\t';
    fs.createReadStream(fullFileName)
        .pipe(sutil.head(1)) // get head lines
        .pipe(sutil.split())
        .setEncoding('utf8')
        .on('data', function(data){
            // remove linebreaks
            data = data.replace(/(\r\n|\n|\r)/gm,"");
            console.log('headers',data.split(delimiter))
            cb(null,{headers:data.split(delimiter)})
        })
}


module.exports = function (app,isLoggedIn) {

    // upload from web app
    app.post('/api/upload', isLoggedIn, multerUpload.any(), function (req, res) {
        //console.log('req user', req.user);
        //console.log('req.files',req.files);
        //console.log('req.body',req.body);
        //console.log('req.query',req.query);
        headers(req,function(err,result){
            if (err){
                res.status(500)
            } else {
                var response = {};
                response.fields = [];
                response.fileName = req.files[0].originalname;
                result.headers.forEach(function(h){
                    response.fields.push({name:h})
                })
                console.log('response',response)
                res.status(200).json(response);
            }
        })

    });

    // handle upload via api
    // post route to upload files via rest api
    // api token is the feedline id for which to upload the file
    // drop a message to the message bus
    // process file and expose processed files via anoother api route
    
    

}
