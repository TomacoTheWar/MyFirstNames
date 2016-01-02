var express = require('express'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    firstnames        = require('./routes/firstnames'),

    // Database
    mongo = require('mongodb'),
    monk = require('monk'),
    db = monk('localhost:27017/Firstnames'),

    app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());      // simulate DELETE and PUT




// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});




// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use('/', firstnames);

/*app.get('/sessions', sessions.findAll);
app.get('/sessions/:id', sessions.findById);*/



/*app.get('/firstnames', firstnames.findAll);
app.get('/firstnames/:id', firstnames.findById);
app.get('/firstnames/name/:firstname', firstnames.findByName);
app.get('/firstnames/search/:letters', firstnames.loadNames);*/

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
