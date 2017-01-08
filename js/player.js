var playerProps = {

  // MOVE LEFT
  moveLeft:function(speed) {
    game.physics.arcade.accelerateToXY(player, 0, game.world.height, speed, 300)
    player.animations.play('left')
  },

  // MOVE RIGHT
  moveRight: function(speed) {
    game.physics.arcade.accelerateToXY(player, game.world.width, game.world.height, speed, 300)
    player.animations.play('right')
  },

  // STOP MOVING
  stopMoving: function() {
    player.animations.stop()
    player.frame = 4
    player.body.acceleration.setTo(0)
  },

  // JUMP
  jump: function() {
    player.body.gravity.y = 300
    player.body.velocity.y = -250
    player.leftAnim.speed = 5
    player.rightAnim.speed = 5
  },

  // IS THE PLAYER STANDING ON SOLID GROUND?
  isGrounded: function() {
    var hitPlatform = game.physics.arcade.collide(player, platforms)
    return player.body.touching.down && hitPlatform
  },

  // APPLY GROUNDED PHYSICS
  setGroundPhysics: function() {
    player.leftAnim.speed = 10
    player.rightAnim.speed = 10
    player.body.drag.set(3000)
  }
}
