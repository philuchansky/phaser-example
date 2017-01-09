var game = new Phaser.Game(800, 300, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var player;
var remainingJumps;
var platforms;
var ground;
var cursors;

function create() {
  game.physics.startSystem(Phaser.Physics.Arcade)
  game.add.image(0, 0, 'sky')
  platforms = game.add.group()
  platforms.enableBody = true
  ground = platforms.create(0, game.world.height - 64, 'ground')
  ground.scale.setTo(2, 2)
  ground.body.immovable = true

  // OTHER LEDGES:
  // var ledge = platforms.create(400, 400, 'ground')
  // ledge.body.immovable = true
  // ledge = platforms.create(-150, 250, 'ground')
  // ledge.body.immovable = true

  player = game.add.sprite(32, game.world.height - 150, 'dude')
  Object.assign(player, playerProps)
  game.physics.arcade.enable(player)
  player.body.bounce.y = 0.1
  player.body.bounce.x = 0.2
  player.body.gravity.y = 800
  player.body.collideWorldBounds = true
  player.leftAnim = player.animations.add('left', [0, 1, 2, 3], 10, true)
  player.rightAnim = player.animations.add('right', [5, 6, 7, 8], 10, true)

  cursors = game.input.keyboard.createCursorKeys()
}

function update() {
  // CHECK IF PLAYER IS ON SOLID GROUND WITH EACH FRAME
  var playerIsGrounded = player.isGrounded()

  if(playerIsGrounded) {
    remainingJumps = 2
    player.setGroundPhysics()

    if(cursors.left.isDown) {
      player.moveLeft(1600)
    } else if(cursors.right.isDown) {
      player.moveRight(1600)
    } else {
      player.stopMoving()
    }

    if(cursors.up.isDown) {
      player.jump()
      remainingJumps = 1
      console.log(remainingJumps)
    }

  } else if(cursors.up.isDown && remainingJumps) {
    player.jump()
    remainingJumps = 0
    console.log(remainingJumps)
  } else {
    player.body.drag.set(0)
    player.body.acceleration.setTo(0)

    if(cursors.left.isDown) {
      player.moveLeft(500)
    } else if(cursors.right.isDown) {
      player.moveRight(500)
    }
  }

  if(cursors.up.isUp) {
    player.body.gravity.y = 800
  }

}
