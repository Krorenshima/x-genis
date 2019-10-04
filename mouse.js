let mouse, mmove;

mouse = {
  x: 0, y: 0,
  l: {x: 0, y: 0},
  get delt () {return {x: this.l.x - this.x, y: this.l.y - this.y}},
  get abs () {return {x: Math.abs(this.delt.x), y: Math.abs(this.delt.y)}},
  pressed: !1,
  direc: '',
  chdirec: !1, // changed direction
  moving: !1,
  cursor (icon) {cvs.style.cursor = icon}
}
mmove = setTimeout(() => {
  
}, 1000)
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX - cvs.offsetLeft;
  mouse.y = e.clientY - cvs.offsetTop;
  
  mouse.direc = abs.x > abs.y ? (delta.x > 0 ? 'Left' : 'Right') : (delta.y > 0 ? 'Up' : 'Down');
  
  mouse.l = {x: mouse.x, y: mouse.y}
});
window.addEventListener('mouseup', () => mouse.pressed = !1);
window.addEventListener('mousedown', () => mouse.pressed = !0);
