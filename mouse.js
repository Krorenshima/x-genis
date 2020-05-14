let mouse, mmove;

mouse = {
  l: {x: 0, y: 0},
  ll: {x: 0, y: 0},
  get delt () {
    if (!this.l.x > 0) {return null}
    if (!this.ll.x > 0) {return null}
    return {x: this.l.x - this.x, y: this.l.y - this.y}
  },
  get abs () {
    if (this.delta == null) {return null}
    return {x: Math.abs(this.delt.x), y: Math.abs(this.delt.y)}
  },
  _direc () {
    this.direction = mouse.abs.x > mouse.abs.y ? (mouse.delta.x > 0 ? 'left' : 'right') : (mouse.delta.y > 0 ? 'up', 'down');
  },
  direction: null,
  pressed: !1,
  chdirec: !1, // changed direction
  moving: !1,
  cursor (icon) {cvs.style.cursor = icon}
}
mmove = setTimeout(() => {
  
}, 1000)
window.addEventListener('mousemove', (e) => {
  mouse.l.x = e.clientX - cvs.offsetLeft; mouse.l.y = e.clientY - cvs.offsetTop;
  
  mouse._direc();
  
  mouse.ll.x = mouse.l.x; mouse.ll.y = mouse.l.y;
});
window.addEventListener('mouseup', () => mouse.pressed = !1);
window.addEventListener('mousedown', () => mouse.pressed = !0);
