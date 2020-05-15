let mouse;
mouse = {
  l: {x: 0, y: 0}, ll: {x: 0, y: 0},
  sloc (e, cvs) {
    if (cvs != null) {this.l.x = e.clientX - cvs.offsetTop; this.l.y = e.clientY - cvs.offsetLeft; return}
    this.l.x = e.clientX; this.l.y = e.clientY;
  },
  slloc (e, cvs) {
    if (cvs != null) {this.ll.x = this.l.x; this.ll.y = this.l.y; return}
    this.ll.x = e.offsetX; this.ll.y = e.offsetY;
  },
  get delta () {
    return {x: this.ll.x - this.l.x, y: this.ll.y - this.l.y}
  },
  get abs () {
    return {x: Math.abs(this.delta.x), y: Math.abs(this.delta.y)}
  },
  _direc () {
    this.dir = this.abs.x > this.abs.y ? (this.delta.x > 0 ? 'left' : 'right') : (this.delta.y > 0 ? 'up' : 'down');
    if (this.dir !== this.ldir) {this.chdirec = !0} else {this.chdirec = !1}
    this.ldir = this.dir;
  },
  cursor (icon, cvs) {cvs.style.cursor = icon},
  ldir: null, dir: null, pressed: !1,
  chdirec: !1, moving: !1,
  mvms: 500, mvid: null,
  drag: !1,
  mvfn () {
    if (this.mvms === 0) {
      this.moving = !1;
      this.mvid = clearInterval(this.mvid);
      this.mvms = 500;
    }
    this.mvms--;
  }
}
mouse.dt.mvfn = mouse.dt.mvfn.bind(mouse.dt);
window.addEventListener('mousemove', (e) => {
  if (mouse.mvid != null) {
    mouse.mvid = clearInterval(mouse.mvid);
    mouse.mvid = setInterval(mouse.mvfn, mouse.mvms);
  } else {
    mouse.mvid = setInterval(mouse.mvfn, mouse.mvms);
  }
  mouse.moving = !0;
  mouse.sloc(e); mouse._direc(); mouse.slloc(e);
});
window.addEventListener('mouseup', (e) => {
  mouse.pressed = !1;
  mouse.sloc(e); mouse._direc(); mouse.slloc(e);
});
window.addEventListener('mousedown', (e) => {
  mouse.pressed = !0;
  mouse.sloc(e); mouse._direc(); mouse.slloc(e);
});
