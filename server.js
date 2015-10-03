var express = require('express');
var session = require('express-session');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');


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
/*Configure the multer.*/


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
require('./src/main/route/index')(app,passport);
// End Routes =========================================================================

app.listen(3001, function () {
  console.log('Express server listening on port ' + 3001);
})  // endregion
