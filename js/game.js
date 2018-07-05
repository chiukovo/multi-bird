/**
 * Created 鳥遊戲 by chiuko
 */
var birdGame = {};
var config = {
    groundSpeed: 2,
};

birdGame.preload = function() {
    birdGame.bird = [];
    game.load.image('bg', 'image/background.png');
    //一隻的寬 高 有幾個影格. spritesheet img
    game.load.spritesheet('bird', 'image/bird.png', 92, 64, 3);
    game.load.image('ground', 'image/ground.png');
    game.load.image('pipe', 'image/pipe.png');
    game.load.image('start', 'image/start.png');
    game.load.image('restart', 'image/restart.png');
    //載入進度條
    birdGame.loadText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
        fontSize: '60px',
        fill: '#fff',
    });
    // 设置锚点，用于居中
    birdGame.loadText.anchor.setTo(0.5, 0.5);
    game.load.onFileComplete.add(function(progress) {
        birdGame.loadText.text = progress + '%';
    });
    // 监听加载完毕事件
    game.load.onLoadComplete.add(function() {
        setTimeout(function() {
            game.state.start('created');
        }, 500);
    });
};

birdGame.create = function() {
    //設置bg
    birdGame.bg = game.add.image(0, -128,'bg');
    //設置ground
    birdGame.ground = game.add.tileSprite(0, game.world.height - 128, game.world.width, game.world.height, 'ground');
    //呼叫會動的鳥 然後給id
    Client.askNewBird();
}

birdGame.update = function() {
    //run background
    birdGame.ground.tilePosition.x += config.groundSpeed;
}

birdGame.addNewBird = function(id) {
    //設置鳥兒
    birdGame.bird[id] = game.add.sprite(150, game.world.centerY - 100, 'bird');
    birdGame.bird[id].animations.add('fly');
    birdGame.bird[id].animations.play('fly', 10, true);
    //Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(birdGame.bird[id]);
    //設置簡單動畫
    birdTween = game.add.tween(birdGame.bird[id]).to({ y: game.world.centerY - 150 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
    birdTween.start();
}

birdGame.removeBird = function(id){
    birdGame.bird[id].destroy();
    delete birdGame.bird[id];
};