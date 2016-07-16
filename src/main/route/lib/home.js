var multer  = require('multer');
var _ = require('underscore');
var controller = require('../../controller');
var tools = require('../../model').tools;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
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


module.exports = function (app,isLoggedIn) {
    // =====================================
    // APPLICATION PAGE (with logout links)
    // =====================================
    app.get('/home', isLoggedIn, controller.home.main);
    app.get('/decode', isLoggedIn, controller.home.decode);

    //app.get('/encode',isLoggedIn,controller.application.encode);
    app.get('/google', isLoggedIn, controller.home.google);

    app.post('/upload', isLoggedIn, multerUpload.any(), function (req, res) {
        console.log('req user', req.user)
        console.log(req.files)
        console.log(req.body);
        console.log(req.file);
        res.send(['field1','field2','field3'])
        //res.send({})
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
