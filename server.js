var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/js',express.static(__dirname + '/js'));
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

//server port
server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on ' + server.address().port);
});