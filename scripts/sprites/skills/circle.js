import { Skill } from './skill.js';
import { Bullet } from '../bullet.js';

class Circle extends Skill {
  constructor(p, pS, img, x, y, theta = 0, count = 40, speed = 3) {
    super(p, pS);

    let vec = p.createVector(speed, 0);
    vec.rotate(theta);

    for(let i = 0; i < count; i++) {
      vec = vec.rotate(360/count);
      this.pS.bulletsEnemy.add(new Bullet(p, img, x, y, vec.x, vec.y).actor);
    }
  }

  update() { return false; }
}

export { Circle };
