import { Skill } from './skill.js';
import { Bullet } from '../bullet.js';

class Charybdis extends Skill {
  // 150 follow
  // 100 stop
  // 350 sping

  totalFrames = 600;

  imgHint;
  imgWind;

  hint;
  wind;

  constructor(p, pS) {
    super(p, pS);
    this.counter = this.totalFrames;

    this.imgHint = p.loadImage('./assets/dog_rgb_6_alpha.png');
    this.imgWind = p.loadImage('./assets/dog_rgb_6.png');

    this.hint = this.p.createSprite(...pS.player.getPosXY(), 10, 10);
    this.hint.addImage(this.imgHint);
    this.hint.rotationSpeed = 5;
    this.hint.scale = 2;
  }

  update() {
    if (this.counter == -1) { return false; }
    if (this.counter >= 450) {
      this.hint.position.set(this.pS.player.getPosXY());
    } else if (this.counter == 350) {
      this.wind = new Bullet(this.p, this.imgWind, this.hint.position.x, this.hint.position.y, 0, 0);
      this.wind.setScale(2);
      this.wind.actor.rotationSpeed = 10;
      this.pS.bulletsEnemy.add(this.wind.actor);

      this.hint.remove();
    } else if (this.counter == 0) {
      this.wind.actor.remove();
    }

    this.counter -= 1;
    return true;
  }
}

export { Charybdis };
