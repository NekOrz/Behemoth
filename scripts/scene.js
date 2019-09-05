class Scene {
  //
  pointerGame;
  pG;
  //
  pointerP5;
  p;
  //

  constructor(_pG) {
    this.pointerGame = _pG;
    this.pG = _pG;
  }

  init() {}

  setPointerP5(_p) {
    this.pointerP5 = _p;
    this.p = _p;

    this.init();
  }

  proceed() {
    this.calc();
    this.draw();
    this.finalize();
  }

  draw() {}

  calc() {}

  finalize() {}
}

export { Scene };
