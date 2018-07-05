var Client = {};
Client.socket = io.connect();

Client.askNewBird = function(){
    Client.socket.emit('newBird');
};

Client.socket.on('addNewBird',function(data){
    birdGame.addNewBird(data.id);
});

Client.socket.on('allBirds',function(data){
    for(var i = 0; i < data.length; i++){
        birdGame.addNewBird(data[i].id);
    }
});

Client.socket.on('removeBird',function(id){
    birdGame.removeBird(id);
});