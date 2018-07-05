var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use('/js',express.static(__dirname + '/js'));
app.use('/css',express.static(__dirname + '/css'));
app.use('/image',express.static(__dirname + '/image'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

server.lastPlayderID = 0;

//server port
server.listen(process.env.PORT || 8081,function(){
    console.log('Listening on ' + server.address().port);
});

io.on('connection', function(socket) {
    socket.on('newBird', function() {
        socket.bird = {
            id: server.lastPlayderID++,
        };
        //取得全部鳥
        socket.emit('allBirds', getAllBirds());
        socket.broadcast.emit('addNewBird', socket.bird);

        socket.on('disconnect',function(){
            io.emit('removeBird',socket.bird.id);
        });
    });
});

function getAllBirds(){
    var birds = [];

    Object.keys(io.sockets.connected).forEach(function(socketID){
        var bird = io.sockets.connected[socketID].bird;
        if ( bird ) {
            birds.push(bird);
        }
    });

    return birds;
}