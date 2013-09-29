// Express is the web framework

// Express is the web framework
var flash = require('connect-flash'), express = require('express'), passport = require('passport'), util = require('util'), LocalStrategy = require('passport-local').Strategy;

var app = express();

var allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.send(200);
	} else {
		next();
	}
};

app.configure(function() {
	app.use(allowCrossDomain);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.logger());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({
		secret : 'keyboard cat'
	}));
	// Initialize Passport!  Also use passport.session() middleware, to support
	// persistent login sessions (recommended).
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(__dirname + '/../../public'));
});

app.use(express.bodyParser());

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3412/login

app.post('/login', passport.authenticate('local', {
	successRedirect : 'http://127.0.0.1:8020/ebay/app/index.html',
	failureRedirect : 'http://127.0.0.1:8020/ebay/app/login.html#login'
}));


var user = require("./users.js");
var User = user.User;

var userList = new Array(new User("derick", "pass1"), new User("frankie", "pass2"));
var userNextId = 0;

for (var i = 0; i < userList.length; ++i) {
	userList[i].id = userNextId++;
}

// Server starts running when listen is called.
require('./passport.js')(passport, LocalStrategy);

app.listen(process.env.PORT || 3412);
console.log("server listening");
