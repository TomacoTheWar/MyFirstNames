var express = require('express');
var router = express.Router();




//findAll
router.get('/firstnames', function(req, res) {
    var db = req.db;
    var collection = db.get('tb_first_names');
    //console.log(collection);
    collection.find({},{ limit: 5 },function(e,docs){
        res.json(docs);
    });
});

//findAll
router.get('/firstnames/getfrom/:number/:genre', function(req, res) {
	var db = req.db;
	var collection = db.get('tb_first_names');
	var number = eval(req.params.number);
    var genre = eval(req.params.genre);
    var zquery ={};
    if(genre !=2){
        zquery ={genre : genre}
    }

	collection.find({ $query: zquery}, { skip: number , limit: 5 , $orderby: {nbHit:1}},function(e,docs){
		res.json(docs);
	});
});


//findbyID
router.get('/firstnames/:id', function(req, res) {
    var db = req.db;
    var reqId = req.params.id;

    var collection = db.get('tb_first_names');

    var query = {};
    query["_id"] = eval(reqId);

    collection.findOne({query},function(e,docs){
        res.json(docs);
    });
});


//findbyName
router.get('/firstnames/name/:firstname', function(req, res) {
    var db = req.db;
	var request = decodeURI(req.params.firstname.replace(" ","")).split('+');
    var collection = db.get('tb_first_names');
    collection.find({firstname:{$in:request}},{},function(e,docs){
        res.json(docs);
    });
});

//findbyGenre
router.get('/firstnames/genre/:genre', function(req, res) {
    var db = req.db;
    var collection = db.get('tb_first_names');
    var genre = eval(req.params.genre);
    var zquery ={};
    if(genre !=2){
        zquery ={genre : genre}
    }
    console.log(genre);
    collection.find({$query: zquery},{},function(e,docs){
        res.json(docs);
    });
});

//LoadNames
router.get('/firstnames/search/:letters', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({firstname :/^req.params.letters/},{},function(e,docs){
        res.json(docs);
    });
});


//Load Top
router.get('/gettop/:sens/:number', function(req, res) {
	var db = req.db;
	var sens = eval(req.params.sens);
	var number = eval(req.params.number);
	var collection = db.get('tb_top_first_names');

	collection.find( { $query: {}}, { skip: number , limit: 5 , $orderby: {nbHit:sens}} ,function(e,docs){
		res.json(docs);
	});
});

//Load Top Recent
router.get('/getrecenttop/:sens/:number', function(req, res) {
	var db = req.db;
	var sens = eval(req.params.sens);
	var number = eval(req.params.number);
	var collection = db.get('tb_top_recent');

	collection.find( { $query: {}}, { skip: number , limit: 5 , $orderby: {nbHit:sens}}, function(e,docs){
		res.json(docs);
	});

});

module.exports = router;
