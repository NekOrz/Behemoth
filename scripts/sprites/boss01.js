import { Bullet } from './bullet.js';
import { Circle } from './skills/circle.js';
import { Meteor } from './skills/meteor.js';
import { Charybdis } from './skills/charybdis.js';

class Boss01 {
  //
  pointerP5;
  p;
  //
  pointerScene;
  pS;
  //

  actor;

  healthPoints = 1000;
  isDead = false;

  moveState = 0;
  moveCounter = 60;

  hurtCounter = 0;

  constructor(p, _pS) {
    this.pointerP5 = p;
    this.p = p;

    this.pointerScene = _pS;
    this.pS = _pS;

    this.actor = p.createSprite(p.width/2, 200, 50, 50);
    this.actor.addAnimation(
      './assets/dog_rgb_0.png',
      './assets/dog_rgb_1.png',
      './assets/dog_rgb_2.png',
      './assets/dog_rgb_3.png',
      './assets/dog_rgb_4.png',
      './assets/dog_rgb_5.png',
      './assets/dog_rgb_6.png',
      './assets/dog_rgb_7.png',
      './assets/dog_rgb_8.png',
      );
    this.actor.scale = 1;
    this.actor.setCollider('circle', 0, 0, 60);
    this.actor.debug = true;
    this.actor.animation.frameDelay = 6;

    this.bulletImg = p.loadImage('./assets/dog_rgb_1.png');
  }

  hurt(num) {
    this.healthPoints -= num;
    if(this.hurtCounter == 0) { this.hurtCounter = 6; }
  }

  move() {
    let p = this.p;

    //Check if dying
    if(this.moveState == -1) { //dying
       this.actor.setVelocity(0, 0);
       this.actor.visible = true;
      // this.actor.rotationSpeed = 0;
      // this.actor.rotation = 0;
      this.moveCounter -= 1;
      if(this.moveCounter == 0) {
        this.die();
        return;
      }
      this.actor.position.add(p.random(-5, 5), p.random(-5, 5));
      return;
    }
    if(this.healthPoints <= 0) {
      this.moveState = -1;
      this.moveCounter = 500;
    }

    //Check if hurted
    if(this.hurtCounter != 0) {
      if(this.hurtCounter % 3  == 0) {
        this.actor.visible = !this.actor.visible;
      }
      this.hurtCounter -= 1;
    }

    //Moveset
    if(this.moveState == 0) { //Idle
      this.moveCounter -= 1;
      if(this.moveCounter <= 0) {
        this.goNextMove();
      }
      return;
    }

    if(this.moveState == 1) { //Circle and move

      if(this.moveCounter <= 0) {
        this.idle();
      }

      if(this.moveCounter % 30 == 0) {
        new Circle(this.p, this.pS, this.bulletImg, this.actor.position.x, this.actor. position.y, (this.moveCounter/15));
      }

      if(this.moveCounter > 0 && (this.moveCounter - 30) % 60 == 0) {
        this.actor.velocity.x *= -1;
      }

      this.moveCounter -= 1;
      return;
    }

    if(this.moveState == 2) { // Meteor
      if(this.moveCounter == 0) {
        this.idle();
        return;
      }

      if(this.moveCounter % (50) == 0) {
        this.pS.skills.push(new Meteor(this.p, this.pS, ...this.pS.player.getPosXY()));
      }

      this.moveCounter -= 1;
      return;
    }

    if(this.moveState == 3) { //wind charybdis
      if(this.moveCounter == 0) {
        this.idle();
        return;
      }

      if(this.moveCounter % 50 == 0) {
        this.pS.skills.push(new Charybdis(this.p, this.pS));
      }

      this.moveCounter -= 1;
      return;
    }
  }

  die() {
    this.actor.remove();
    this.actor.position.set(-100, -100);
    this.isDead = true;
  }

  goNextMove() {
    this.moveState = this.p.floor(this.p.random(3)+1);

    // this.moveState = 3;

    if(this.moveState == 1) {
      this.moveCounter = 5 * 60;
      this.actor.setVelocity(-2, 0);
      return;
    }

    if(this.moveState == 2) {
      this.moveCounter = 300;
      return;
    }

    if(this.moveState == 3) {
      this.moveCounter = 900;
      return;
    }

  }

  idle(frame = 120) {
    this.moveState = 0;
    this.moveCounter = frame;
    this.actor.setVelocity(0, 0);
  }

}

export { Boss01 };
