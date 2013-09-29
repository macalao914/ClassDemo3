
function mytest(){

	$.ajax({
		url : "http://localhost:3412/login",
		contentType: "application/json",
		type:"post",
		success : function(data, textStatus, jqXHR){
			for (var i=0; i < data.user.length; i++) {
			  if(data.user[i].email == document.getElementById("email").value 
			  && data.user[i].pass == document.getElementById("password").value){
			  	location.href="../app/index.html";
			  }
			  else{
			  	console.log("wrong pass");
			  }
			};
		},
		error: function(data, textStatus, jqXHR){
			console.log(textStatus);
			console.log("this error");

		}
		
	});
/*
 * 
 *type:"POST"; 
 *
 * 
 * 
 * 
var flash = require('connect-flash'), express = require('express'), passport = require('passport'), util = require('util'), LocalStrategy = require('passport-local').Strategy;

var users = [{
	id : 1,
	username : 'bob',
	password : 'secret',
	email : 'bob@example.com'
}, {
	id : 2,
	username : 'joe',
	password : 'birthday',
	email : 'joe@example.com'
}];

function findById(id, fn) {
	var idx = id - 1;
	if (users[idx]) {
		fn(null, users[idx]);
	} else {
		fn(new Error('User ' + id + ' does not exist'));
	}
}

function findByUsername(username, fn) {
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.username === username) {
			return fn(null, user);
		}
	}
	return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	findById(id, function(err, user) {
		done(err, user);
	});
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(function(username, password, done) {
	// asynchronous verification, for effect...
	  	 console.log("LocalStrategy invoked");

	process.nextTick(function() {

  	 console.log("LocalStrategy next ticket");

		// Find the user by username.  If there is no user with the given
		// username, or the password is not correct, set the user to `false` to
		// indicate failure and set a flash message.  Otherwise, return the
		// authenticated `user`.
		findByUsername(username, function(err, user) {
			  	 console.log("LocalStrategy find username" + user);

			if (err) {
				 console.log("LocalStrategy error: " + err);
				return done(err);
			}
			if (!user) {
				return done(null, false, {
					message : 'Unknown user ' + username
				});
			}
			if (user.password != password) {
				return done(null, false, {
					message : 'Invalid password'
				});
			}
			return done(null, user);
		});
	});
}));

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

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

// configure Express
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

app.get('/', function(req, res) {
	res.render('index', {
		user : req.user
	});
});

app.get('/account', ensureAuthenticated, function(req, res) {
	res.render('account', {
		user : req.user
	});
});

app.get('/login', function(req, res) {
	res.render('login', {
		user : req.user,
		message : req.flash('error')
	});
});

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/login', passport.authenticate('local', {
	successRedirect : '/',
	failureRedirect : '/login'
}));
// POST /login
//   This is an alternative implementation that uses a custom callback to
//   acheive the same functionality.
/*
 app.post('/login', function(req, res, next) {
 passport.authenticate('local', function(err, user, info) {
 if (err) { return next(err) }
 if (!user) {
 req.flash('error', info.message);
 return res.redirect('/login')
 }
 req.logIn(user, function(err) {
 if (err) { return next(err); }
 return res.redirect('/users/' + user.username);
 });
 })(req, res, next);
 });
 

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

 * 
 * 
 * 
 * 
 * 
 *  
 *
$(document).on('pagebeforeshow', "#cars", function( event, ui ) {
	
	
	console.log("Jose");
	$.ajax({
		url : "http://localhost:3412/ClassDemo3Srv/cars",
		contentType: "application/json",
		success : function(data, textStatus, jqXHR){
			var carList = data.cars;
			var len = carList.length;
			var list = $("#cars-list");
			list.empty();
			var car;
			for (var i=0; i < len; ++i){
				car = carList[i];
				list.append("<li><a onclick=GetCar(" + car.id + ")>" + 
					"<h2>" + car.make + " " + car.model +  "</h2>" + 
					"<p><strong> Year: " + car.year + "</strong></p>" + 
					"<p>" + car.description + "</p>" +
					"<p class=\"ui-li-aside\">" + accounting.formatMoney(car.price) + "</p>" +
					"</a></li>");
			}
			list.listview("refresh");	
		},
		error: function(data, textStatus, jqXHR){
			console.log("textStatus: " + textStatus);
			alert("Data not found!");
		}
	});
});
*/
	
}

