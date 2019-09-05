import { Scene } from '../scene.js';

class TitleScreen extends Scene {
  constructor(_pG) {
    super(_pG);
  }

  draw() {
    let p = this.p;

    p.background(0, 0, 0);
    p.push()
      p.textAlign(p.CENTER);
      p.textSize(100);
      p.text('Behemoth', 0, 150, p.width);
      p.textSize(40);
      p.text('射炸　　↑　', 0, 330, p.width);
      p.text('ＺＸ　←↓→', 0, 380, p.width);
      p.text('ＳＨＩＦＴ半速', 0, 480, p.width);
      p.text('Press Z to start', 0, 800, p.width);
    p.pop();
  }

  calc() {
    let keys = this.pG.keys;

    if(keys.z) {
      this.pG.gameState = 1;
    }
  }
}

export { TitleScreen };
