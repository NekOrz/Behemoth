import { Bullet } from './bullet.js';

class Player {
  //
  pointerP5;
  p;
  //
  pointerScene;
  pS;
  //

  actor;

  diameter = 20;
  radius = 10;

  bulletCD = 0;

  constructor(p, _pS) {
    this.pointerP5 = p;
    this.p = p;

    this.pointerScene = _pS;
    this.pS = _pS;

    let img = p.loadImage('./assets/dog_og.png');

    this.actor = p.createSprite(p.width/2, p.height - 100, 50, 50);
    this.actor.addImage(img);
    this.actor.scale = 0.5;
    this.actor.setCollider('circle', 0, 0, this.diameter);
    this.actor.debug = true;

    this.bulletImg = p.loadImage('./assets/dog_rgb_3.png');
  }

  handleInput(keys) {
    let p = this.p;
    let vX = 0, vY = 0;

    if(keys.l) { vX -= 8; }
    if(keys.r) { vX += 8; }
    if(keys.u) { vY -= 7; }
    if(keys.d) { vY += 7; }
    if(keys.z && this.bulletCD == 0) { this.shoot(); }
    if(keys.x) { this.bomb(); }
    if(keys.shift) { vX /= 2; vY /= 2;}

    this.actor.position.add(vX, vY);

    if (this.actor.position.x < this.radius) { this.actor.position.x = this.radius; }
    if (this.actor.position.y < this.radius) { this.actor.position.y = this.radius; }
    if (this.actor.position.x > p.width - this.radius) { this.actor.position.x = p.width - this.radius; }
    if (this.actor.position.y > p.height - this.radius) { this.actor.position.y = p.height - this.radius; }

    if(this.bulletCD != 0) {
      this.bulletCD -= 1;
    }
  }

  shoot() {
    let bullet = new Bullet(this.p, this.bulletImg,this.actor.position.x, this.actor.position.y, 0, -24);
    this.pS.bullets.add(bullet.actor);
    bullet = new Bullet(this.p, this.bulletImg, this.actor.position.x, this.actor.position.y, -2, -24);
    this.pS.bullets.add(bullet.actor);
    bullet = new Bullet(this.p, this.bulletImg, this.actor.position.x, this.actor.position.y, 2, -24);
    this.pS.bullets.add(bullet.actor);

    this.bulletCD = 5;
  }

  bomb() {

  }

  hurt() {
    this.actor.animation.images[0].filter(this.p.INVERT);
  }

  getPosXY() {
    return [this.actor.position.x, this.actor.position.y];
  }
}

export { Player };
