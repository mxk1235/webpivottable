/**
 * Module dependencies.
 */
var express = require( 'express' ),
	session = require('express-session'),
	passport = require('passport'),
	local = require('passport-local'),
	googlestrat = require('passport-google'),
    bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    wpt = require('./wpt.js'),
    app = module.exports = express();

app.use(express.static(__dirname + '/public')); 	
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(methodOverride());

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post( '/wpt/fileProxy', wpt.fileProxy);

app.post( '/wpt/generatePdf', wpt.generatePdf);

app.post( '/wpt/xmlaProxy', wpt.xmlaProxy);

// Bootstrap passport config
require('./passport')(); 

app.post( '/auth/signin', function(req, res, next) {
    console.log('in signin ');
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            res.status(400).send({errors:[{errorId:'ERROR_SERVER_GENERAL'}, err]});
        }else if (!user) {
            res.status(400).send(info);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            req.login(user, function(err) {
                if (err) {
                    res.status(400).send({errors:[err]});
                } else {
                    res.jsonp(user);
                }
            });
        }
    })(req, res, next);
});
//app.post( '/auth/signup', );
//app.post( '/auth/forget', );


// catch the uncaught errors that weren't wrapped in a domain or try catch statement
// do not use this in modules, but only in applications, as otherwise we could have multiple of these bound
process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log('error', err);
});

app.listen( process.env.PORT || 8002 );
console.log("Express server listening on port "+(process.env.PORT||8002));





