var multer  = require('multer')
var controller = require('../../controller')
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

    app.post('/save', isLoggedIn, function (req, res) {
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
                    console.log('ia m result', result)
                    res.send({})
                }
            }
        )
    })
}
