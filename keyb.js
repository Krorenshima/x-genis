let keyb;
keyb = {
  keys: new Map(),
  isDown (...keys) {
    let ji = 0;
    for (let key of keys) {
      ji += this.keys.has(key) && this.keys.get(key).pressed ? 1 : -1;
    }
    return !(ji <= 0 ? 1 : 0);
  },
  anyDown: !1,
  selt (e, down) {
    this.anyDown = down;
    let lol = e.key.toLowerCase();
    if (!this.keys.has(lol)) {
      this.keys.set(lol, new this._key(e, down));
      return;
    }
    this.keys.get(lol).pressed = down;
  },
  _key: (function () {
    let k;
    k = function (e, down) {
      this.key = e.key.toLowerCase();
      this.pressed = down;
      this.info = e;
    }
    k.prototype = {
      constructor: k,
      valueOf () {return this.pressed}
    }
    return k;
  })()
}
window.addEventListener('keyup', (e) => keyb.selt(e, !1));
window.addEventListener('keydown', (e) => keyb.selt(e, !0));
