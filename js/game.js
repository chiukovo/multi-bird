/**
 * Created 鳥遊戲 by chiuko
 */
var birdGame = {};

birdGame.config = {

};

birdGame.preload = function() {
    game.load.image('bg', 'image/background.png');
    //一隻的寬 高 有幾個影格. spritesheet img
    game.load.spritesheet('bird', 'image/bird.png', 92, 64, 3);
    game.load.image('ground', 'image/ground.png');
    game.load.image('pipe', 'image/pipe.png');
    game.load.image('start', 'image/start.png');
    game.load.image('restart', 'image/restart.png');
    //載入進度條
    var text = game.add.text(game.world.centerX, game.world.centerY, '0%', {
        fontSize: '60px',
        fill: '#fff',
    });
    // 设置锚点，用于居中
    text.anchor.setTo(0.5, 0.5);
    game.load.onFileComplete.add(function(progress) {
        text.text = progress + '%';
    });
};
