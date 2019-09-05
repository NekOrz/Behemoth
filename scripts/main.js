import { myGame } from './game.js';

const main = p => {
  p.setup = () => {
    myGame.init(p)

  }

  p.draw = () => {
    myGame.keys.l = p.keyIsDown(p.LEFT_ARROW);
    myGame.keys.r = p.keyIsDown(p.RIGHT_ARROW);
    myGame.keys.u = p.keyIsDown(p.UP_ARROW);
    myGame.keys.d = p.keyIsDown(p.DOWN_ARROW);
    myGame.keys.z = p.keyIsDown(90) | p.keyIsDown(122);
    myGame.keys.x = p.keyIsDown(88) | p.keyIsDown(120);
    myGame.keys.shift = p.keyIsDown(p.SHIFT);

    myGame.nextFrame();
  }
}

const myp5 = new p5(main, 'body');
