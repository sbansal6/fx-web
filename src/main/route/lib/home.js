var multer  = require('multer');
var path = require('path');
var _ = require('underscore');
var fs = require('fs')
var csv = require('csv');
var controller = require('../../controller');
var tools = require('../../model').tools;

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
    //console.log('fullFileName',fullFileName);
    var delimiter = req.body.type === 'csv' ? ',' : '/t';
    //console.log('delimiter',delimiter)
    var input = fs.createReadStream(fullFileName);
    var n = 0;
    var parser = csv.parse({delimiter: delimiter})
    input.pipe(parser);
    var hit = false;
    var headers = "";
    var n = 0;
    parser.on('readable', function() {
        n++;
        if (!hit) {
            var first = parser.read();
            headers = first;
            input.unpipe(parser);
            parser.end();
            hit = true;
            cb(null,{headers:headers})
        }
    })

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
        //console.log('req user', req.user);
        //console.log('req.files',req.files);
        //console.log('req.body',req.body);
        //console.log('req.query',req.query);
        headers(req,function(err,result){
            if (err){
                res.status(500)
            } else {
                res.status(200).json(result);
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
    })

    /**
     * Update a tool by name
     */
    app.post('/tool',isLoggedIn,function(req,res){
        var user = req.user;
        var body = req.body;
        var toolName = body.toolName;
        tools.update(
            {userId:user._id,"tools.name":toolName},
            {
                $set:{
                "tools.$.settings":body.settings,
                "tools.$.canvas":body.canvas,
                "tools.$.nodes":body.nodes
            }
            },
            function (err) {
                if (err) {
                    console.log('err', err)
                } else {
                    res.json({status:"updated"})
                }
            }
        )
    })

}
