import { Scene } from '../scene.js';
import { Player } from '../sprites/player.js'
import { Boss01 } from '../sprites/boss01.js'
import { Bullet } from '../sprites/bullet.js'

class Stage01 extends Scene {
  player;
  boss;
  despawnBox;

  bullets;
  bulletsEnemy;

  skills = [];

  deathCount = 0;

  constructor(_pG) {
    super(_pG);
  }

  init() {
    let p = this.p;
    this.player = new Player(p, this);
    this.boss = new Boss01(p, this);

    this.despawnBox = p.createSprite(p.width/2, p.height/2, p.width+50, p.height+50);
    this.despawnBox.visible = false;

    this.bullets = new p.Group();
    this.bulletsEnemy = new p.Group();
  }

  draw() {
    let p = this.p;

    p.background(40, 40, 40);
    p.drawSprites();

    // p.push();
    //   p.textSize(16);
    //   p.fill(255, 255, 255);
    //   p.text('' + p.frameRate(), 700, 700);
    // p.pop();

    if(this.boss.isDead) {
      p.push();
        p.textSize(80);
        p.textAlign(p.CENTER);
        p.text('Congradulations!', 0, 300, p.width);
        p.textSize(40);
        p.text('Your death count(s) is: ' + this.deathCount, 0, 400, p.width);
        p.text('Thanks for playing!', 0, 500, p.width);
        p.textSize(20);
        p.text('Press F5 to restart', 0, 700, p.width);
      p.pop();
      return;
    }

    if(this.boss.moveState == 1) {
      p.push();
        p.textSize(20);
        p.textAlign(p.RIGHT);
        p.text('貝希摩斯正在使用 地裂掌', p.width, 200);
      p.pop();
    } else if(this.boss.moveState == 2) {
      p.push();
        p.textSize(20);
        p.textAlign(p.RIGHT);
        p.text('貝希摩斯正在使用 彗星', p.width, 200);
      p.pop();
    } else if(this.boss.moveState == 3) {
      p.push();
        p.textSize(20);
        p.textAlign(p.RIGHT);
        p.text('貝希摩斯正在使用 大漩渦', p.width, 200);
      p.pop();
    }
  }

  calc() {
    let keys = this.pG.keys;

    this.player.handleInput(keys);
    this.boss.move();
    //Update skills
    for (let i = 0; i < this.skills.length; i++) {
        if(!this.skills[i].update()) {
          this.skills.splice(i, 1);
      }
    }

    //Bullets
    for (let bullet of this.bullets) {
      if(!bullet.overlap(this.despawnBox)) { bullet.remove(); }
      if(bullet.overlap(this.boss.actor)) {
        this.boss.hurt(1);
        bullet.remove();
      }
    }

    for (let bullet of this.bulletsEnemy) {
      if(!bullet.overlap(this.despawnBox)) { bullet.remove(); }
      if(bullet.overlap(this.player.actor)) {
        this.player.hurt();
        this.deathCount++;
        bullet.remove();
      }
    }
  }

  spawnBullet() {

  }


}

export { Stage01 };
