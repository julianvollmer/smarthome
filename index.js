var express = require('express');
var http = require('http');
var app = express();
var httpServer = http.Server(app);

var path = require('path')
var request = require('request');
var exec = require('child_process').exec;

var itemsInQue = 1;
var delay = 3000;
var call = 0;
var pathToService = "/home/pi/workspace/smarthome";

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/signal/:bulbId/:cmd', function(request, response, next) {
	var cmd = request.params.cmd;
	var bulbId = request.params.bulbId;
	execCmd("sudo " + pathToService + "/cmd.sh " + bulbId + " " + cmd );
	response.send(200, cmd);
});


app.get('/color/:bulbId/:color', function(request, response, next) {
	var color = request.params.color;
	var bulbId = request.params.bulbId;
	color = color * 0.707;
	color = Math.round(Number(color)); 
	color = color.toString(16);
	execCmd("sudo " + pathToService + "/color.sh " + bulbId + " " + color);
	response.send(200, "notification color: " + color);
});

app.get('/brightness/:bulbId/:brightness', function(request, response, next) {
	var brightness = (Math.round(Number((request.params.brightness - 100)/ 6.25))* (-1)* 8).toString(16);
	var bulbId = request.params.bulbId;
	execCmd("sudo " + pathToService + "/brightness.sh " + bulbId + " " + brightness);
	response.send(200, "notification brightness: " + brightness);
});

app.get('/outlet/:deviceId/:state', function(request, response, next) {
	var cmd = "sudo send433 11111 " + request.params.deviceId + " " + request.params.state;
	execCmd(cmd);
    response.send(cmd);
});

app.get('/disco/:on', function(request, response, next) {
	var on = request.params.on;
	var cmd = "sudo " + pathToService + (on==="1" ? "/disco.sh" : "/reset.sh");
	console.log(cmd + on);
	execCmd(cmd);
    response.send(cmd);
});

app.get('/reset/', function(request, response, next) {
	var cmd = "sudo " + pathToService + "/reset.sh";
	execCmd(cmd);
    response.send(cmd);
});


function execCmd (cmd) {
	itemsInQue++;
	setTimeout(function () {
		call++;
		exec(cmd);
		console.log(cmd);
		itemsInQue--;
	}, delay * itemsInQue);
}

httpServer.listen(3000, function(){
  	console.log('listening on *:3000');
});