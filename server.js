var express = require('express');
var session = require('express-session');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var winston = require('winston');
var expressWinston = require('express-winston');
var winstonDB = require('winston-mongodb').MongoDB;
var multer  = require('multer')



// Local Requires ==================================================================
var core = require('./src/main').core;
// =================================================================================


// Constants ========================================================================
var PORT = process.env.PORT;

// Mongodb Configuration =============================================================
mongoose.connect(core.environment.mongo.url);

// Express Configuration =============================================================
app.disable('etag');
app.set('views', path.join(__dirname, '/src/main/views'));
app.set('view engine', 'ejs');
app.set('json spaces', 4);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('landingpage'));
//app.use(express.static('theme'));
app.use(flash());
app.all('/*', function (req, res, next) {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// region Configure Logger
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

/**
 * Use Winston Logger
 */
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      json: false,
      colorize: true
    })
    // ,
    // new winston.transports.MongoDB({
    //   host: mongoConfig.host,
    //   port: mongoConfig.port,
    //   db: mongoConfig.database,
    //   collection: 'apilog',
    //   username: mongoConfig.username,
    //   password: mongoConfig.password,
    //   level: 'info',
    //   colorize: true
    // })
  ],
  meta: false, // causing issue with /api/getcomponents api call
  msg: 'HTTP {{req.method}} {{req.url}} {{res}}',
  expressFormat: true,
  colorStatus: true
}));


//endregion

// Passport Configuration =============================================================
require('./src/main/core').passport(passport);
app.use(session({ secret: 'newworldsolutiontooldworldproblem' })); // session secret
app.use(passport.initialize());
app.use(passport.session());

// Routes =============================================================================
app.get('/', function(req, res){
    res.sendfile('index.html', { root: __dirname + "/landingpage" } );
});

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

app.post('/upload',multerUpload.any(),function (req,res) {
  console.log(req.files)
  console.log(req.body);
  console.log(req.file);
  res.send({})
})

require('./src/main/route/index')(app,passport);
// End Routes =========================================================================

// /**
//  * Use Winston Error Logger
//  */
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize: true
    })
    // ,
    // new winston.transports.MongoDB({
    //   host: mongoConfig.host,
    //   port: mongoConfig.port,
    //   db: mongoConfig.database,
    //   collection: 'apilog',
    //   username: mongoConfig.username,
    //   password: mongoConfig.password,
    //   level: 'info',
    //   colorize: true
    // })
  ],
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorStatus: true
}));
// endregion
// endregion
// region Error Handler Middleware
/**
 * Error handler for all the applications
 */
app.use(function (err, req, res, next) {
  console.log(err.stack)
  var body = {
    error: {
      message: err.message || '',
      type: err.name || '',
      code: err.code,
      error_subcode: err.subcode || err.code
    }
  };
  // to do, handle 500 internal server errors
  if (err.code == 500) {
    console.log('hahah');
  }
  res.status(err.status).json(body);
});
// endregion

app.listen(3001, function () {
  console.log('Express server listening on port ' + 3001);
})  // endregion
