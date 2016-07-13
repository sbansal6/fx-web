var multer  = require('multer')
var controller = require('../../controller')
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
  app.get('/home', isLoggedIn ,controller.home.main);
  app.get('/decode',isLoggedIn,controller.home.decode);
  //app.get('/encode',isLoggedIn,controller.application.encode);
  app.get('/google',isLoggedIn,controller.home.google);

  app.post('/upload',isLoggedIn,multerUpload.any(),function (req,res) {
        console.log('req user',req.user)
        console.log(req.files)
        console.log(req.body);
        console.log(req.file);
        res.send({})
  });

  app.post('/save',isLoggedIn,function(req,res){
        console.log('req user',req.user);
        console.log('body',req.body);
        tools.update(
            {userId:req.user._id},
            {
                $set:{}
            }
        )
        res.send({});
  })

};