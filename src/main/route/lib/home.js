var multer  = require('multer');
var path = require('path');
var _ = require('underscore');
var fs = require('fs');
var sutil = require('line-stream-util')
var csv = require('csv');
var controller = require('../../controller');
var tools = require('../../model').tools;
var processorService = require('../../services/processor.service');

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
})

var multerUpload = multer({ storage: storage })

var headers = function(req,cb){
    var fullFileName = path.join(req.user.rootDir,req.files[0].originalname);
    var delimiter = req.body.type === 'csv' ? ',' : '/t';
    fs.createReadStream(fullFileName)
        .pipe(sutil.head(1)) // get head lines
        .pipe(sutil.split())
        .setEncoding('utf8')
        .on('data', function(data){
            cb(null,{headers:data.split(delimiter)})
        })
}

function updateTool(req,cb){
    var user = req.user;
    var body = req.body;
    var toolName = body.toolName;
    var query = {userId:user._id,"tools.name":toolName}
    var update = {
        "tools.$.settings":body.settings,
        "tools.$.canvas":body.canvas,
        "tools.$.nodes":body.nodes
    }
    tools.findOneAndUpdate(
        query,
        update,
        {new:true},
        function(err,doc){
            if (err){
                cb(err)
            } else {
                var tool = _.find(doc.tools, function (t) {
                    return t.name === toolName
                });
                cb(null,tool)
            }
        }
    )
}

module.exports = function (app,isLoggedIn) {
    // =====================================
    // APPLICATION PAGE (with logout links)
    // =====================================
    app.get('/home', isLoggedIn, controller.home.main);
    app.get('/decode', isLoggedIn, controller.home.decode);

    //app.get('/encode',isLoggedIn,controller.application.encode);
    app.get('/google', isLoggedIn, controller.home.google);

    app.post('/upload', isLoggedIn, multerUpload.any(), function (req, res) {
        console.log('i am in upload')
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
                res.status(200).json(response);
            }
        })

    });

    /**
     * Get tool by name
     */
    app.get('/tool',isLoggedIn,function(req,res){
        var user = req.user;
        var toolName  = req.query.toolName ? req.query.toolName : undefined;
        tools.findOne({userId:user._id},function(err,doc){
            if (err){
                console.log('err in get tool',err)
            } else {
                if (toolName){
                    var tool = _.find(doc.tools, function (t) {
                        return t.name === toolName
                    });
                    tool ? res.json(tool) : res.json({status:"tool not found"})
                } else{
                    res.json(doc.tools)
                }

            }
        })
    });

    /**
     * Update a tool by name
     */
    app.post('/tool',isLoggedIn,function(req,res){
        updateTool(req,function(err,doc){
            if (err) {
                console.log('err', err)
            } else {
                res.json({status:"updated"})
            }
        })
    });

    app.post('/analyze',isLoggedIn,function(req,res){
        updateTool(req,function(err,doc){
            if (err) {
                console.log('err', err)
            } else {
                processorService.analyze(doc,req.user,function(err,result){
                    if (err) {
                        console.log('err', err)
                    } else {
                        res.json(result)
                    }
                })
            }
        })
    });

}
