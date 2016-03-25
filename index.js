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


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/singal/:cmd', function(request, response, next) {
	var cmd = request.params.cmd;
	execCmd("sudo /home/pi/workspace/homeautomation/signal.sh cmd");
	response.send(200, cmd);
});


app.get('/color/:color', function(request, response, next) {
	var color = request.params.color;
	color = color * 0.707;
	color = Math.round(Number(color)); 
	color = color.toString(16);
	console.log("myColor: " + color);
	execCmd("sudo /home/pi/workspace/homeautomation/color.sh " + color);
	response.send(200, "notification color: " + color);
});

app.get('/brightness/:brightness', function(request, response, next) {
	var brightness = (Math.round(Number((request.params.brightness - 100)/ 6.25))* (-1)* 8).toString(16);
	console.log("mybrightness: " + brightness);
	execCmd("sudo /home/pi/workspace/homeautomation/brightness.sh " + brightness);
	response.send(200, "notification brightness: " + brightness);
});

app.get('/outlet/:deviceId/:state', function(request, response, next) {
	var cmd = "sudo send433 11111 " + request.params.deviceId + " " + request.params.state;
	execCmd(cmd);
    response.send(cmd);
});


function execCmd (cmd) {
	itemsInQue++;
	setTimeout(function () {
		call++;
		exec(cmd);
		itemsInQue--;
	}, delay * itemsInQue);
}

httpServer.listen(3000, function(){
  	console.log('listening on *:3000');
});