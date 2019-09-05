import { TitleScreen } from './scenes/title.js';
import { Stage01 } from './scenes/stage01.js';

class Game {
  screenWidth = 900;
  screenHeight = 900;
  gameState = 0;

  sceneList = [];

  keys = {
    l: false,
    r: false,
    u: false,
    d: false,
    z: false,
    x: false,
    shift: false,
  }

  constructor() {
    this.sceneList.push(new TitleScreen(this));
    this.sceneList.push(new Stage01(this));
  }

  init(p) {
    p.createCanvas(this.screenWidth, this.screenHeight);
    p.fill(255, 255, 255);
    p.textSize(25);
    p.frameRate(60);

    p.angleMode(p.DEGREES);

    for (let scene of this.sceneList) {
      scene.setPointerP5(p);
    }
  }

  nextFrame() {
    this.getCurrentScene().proceed();
  }

  getCurrentScene() {
    return this.sceneList[this.gameState];
  }

  checkDead() {

  }
}

const myGame = new Game();

export { myGame };
