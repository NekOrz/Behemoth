class Bullet {
  //
  pointerP5;
  p;
  //
  actor;

  constructor(p, img, x, y, vX, vY) {
    this.pointerP5 = p;
    this.p = p;

    this.actor = p.createSprite(x, y, 10, 10);
    this.actor.addImage(img);
    this.actor.setCollider('circle', 0, 0, 50);
    this.setScale(0.1);
    // this.actor.debug = true;
    this.actor.setVelocity(vX, vY);
  }

  setScale(n) {
    this.actor.scale = n;
  }

  setLife(n) {
    this.actor.life = n;
  }


}

export { Bullet };
