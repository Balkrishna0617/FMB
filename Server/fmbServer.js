var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logs = require('./logs/fmbLog')();
var config = require('./config/config.json');

// ----------------------------- Configuring server -----------------------------
app.set('file_serving_dir',config.file_serving_dir_local);
app.set('server_addr',config.server_addr_local);
app.set('client',config.client_dir);
app.use(bodyParser.json({ 
    limit: '50mb'
}));
app.use(bodyParser.text({ 
    limit: '50mb'
}));
app.use(bodyParser.raw({ 
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
        extended: true
}));
var file_dir = app.get('file_serving_dir');
var client = app.get('client');
app.use(express.static(file_dir));												//static file directory
app.use(express.static(__dirname + '/..'+ client));									//client directory
app.use(function(req, res, next) {												// CORS Issue Fix
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// ------------------------------ v1 routes --------------------------------------

// ------------------------------ Starting server --------------------------------
var port = 8383;
app.listen(port,function(err){
	if (err) {
    	logs.logErrorServer(err);
	}else{
    console.log("App is running on port : "+ port);
	}	
});