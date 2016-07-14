var multer  = require('multer');
var _ = require('underscore');
var controller = require('../../controller');
var Tools = require('../../model').tools;

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
        res.send({})
    });

    /**
     * save canvas state
     */
    app.post('/savecanvas', isLoggedIn, function (req, res) {
        console.log('req user', req.user);
        console.log('body', req.body);
        Tools.update(
            {userId: req.user._id, "tools.name":req.body.toolName},
            {$set:{"tools.$.canvas":req.body.canvas}},
            {upsert:true},
            function (err, result) {
                if (err) {
                    console.log('err', err)
                } else {
                    res.send({})
                }
            }
        )
    })

    //todo :-  test case here because of json parsingss
    /**
     * Return node state(data) by nodeId
     */
    app.get('/getstate',isLoggedIn,function(req,res){
        // get tools for this user
        Tools.findOne({userId:req.user._id},function(err,doc){
            if (err) {
                console.log('err', err)
            } else {
                var tool = _.find(doc.tools, function (t) {
                    return t.name === req.query.toolName
                });
                var node = _.find(tool.nodes, function (n) {
                    n = JSON.parse(JSON.stringify(n));
                    return n.id === req.query.nodeId
                });
                if (node) {
                    var data = JSON.parse(JSON.stringify(node)).data;
                    res.send(data);
                } else {
                    res.send({});
                }
            }

        })
    })
}
