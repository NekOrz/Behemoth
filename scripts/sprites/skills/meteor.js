import { Skill } from './skill.js';
import { Bullet } from '../bullet.js';
import { Circle } from './circle.js';

class Meteor extends Skill {

  bulletList;
  totalFrames = 150;

  imgHint;
  imgMeteor;

  hint;
  meteor;

  constructor(_p, _pS, x, y) {
    super(_p, _pS);
    this.counter = this.totalFrames;

    this.imgHint = this.p.loadImage('./assets/dog_rgb_2_alpha.png');
    this.imgMeteor = this.p.loadImage('./assets/dog_rgb_1.png');

    this.hint = this.p.createSprite(x, y, 10, 10);
    this.hint.addImage(this.imgHint);

    let xStart = this.p.random(this.p.width);
    let vX = (x - xStart)/150.0;
    let vY = y/150.0;

    this.meteor = new Bullet(_p, this.imgMeteor, xStart, 0, vX, vY);
    this.meteor.setScale(1);
    this.meteor.actor.rotationSpeed = 5;
    this.pS.bulletsEnemy.add(this.meteor.actor);
  }

  update() {
    if (this.counter == -1) { return false; }
    if (this.counter == 0) {
      this.meteor.actor.remove();
      this.hint.remove();
      new Circle(this.p, this.pS, this.imgMeteor, this.hint.position.x, this.hint.position.y, 0, 20);
    }
    this.counter -= 1;
    return true;
  }
}

export { Meteor };
