(function (fact) {
  let mw, b, n;
  if (this['process'] != null) {
    b = (x, y) => ({}).toString.call(x).toLowerCase().includes(y);
    mw = (name, t) => {if (!b(name, 'string')) {module.exports = name; return mw} module.exports[name] = t; return mw}
    n = !0;
  }
  if (this['window'] != null) {
    if (window['pen'] != null) {b = pen.type} else {b = (x, y) => ({}).toString.call(x).toLowerCase().includes(y)}
    mw = (name, t) => {window[name] = t; return mw}
    n = !1;
  }
  fact(mw, b, n);
})(function (mw, type, n) {
  let ev, template;
  ev = function events () {
    if (!(this instanceof ev)) {throw new Error("Use 'new' keyword")}
    this._events = {}; this.maxListeners = null; this.maxEvents = null;
    return this
  }
  ev.prototype = {
    constructor: ev,
    get length () {
      let len; len = 0;
      for (let prop in this._events) {len++}
      if (len > this.maxEvents) {throw new Error("Possible memory leak detected.")}
      return len;
    },
    on (ename, efn) {
      if (efn == null) {throw new Error("Arg #2 can't be empty")}
      if (this.length > this.maxEvents) {console.warn("Can't go over the limit"); return this}
      if (this.has(ename)) {
        let g;
        g = this.get(ename)
        if (efn.name.length === 0) {throw new Error('The function passed has no name')}
        if (g['listeners'] != null) {
          if (g.listeners.length > this.maxListeners) {
            console.warn("Can't go over the limit");
            return this;
          }
          g.listeners.push(efn);
          this._events[ename] = g;
          return this;
        }
        let fn;
        fn = g.listener; delete g.listener;
        g.listeners = [];
        g.listeners.push(fn, efn);
        this._events[ename] = g;
        return this;
      }
      let g = this._events[ename] = {};
      g.listener = efn; g.once = !1;
      this._events[ename] = g;
      return this;
    },
    off (ename, efn) {
      if (!this.has(ename)) {console.warn(`No event with name '${name}'`); return this}
      if (this.hasMulti(ename)) {
        if (efn != null) {
          let evs;
          evs = this._events[ename].listeners;
          for (let i = 0, len = evs.length; i < len; i++) {
            let t = type(efn, 'string') ? efn : efn.name;
            if (evs[i].name === 0) {continue} if (evs[i].name !== t) {continue}
            if (evs[i].name === t) {
              this._events[ename].listeners.splice(i, 1);
              break;
            }
          }
          return this;
        }
        delete this._events[ename];
        return this;
      }
      this._events[ename].listener = null;
      return this;
    },
    has (name) {return this._events[name] != null},
    hasMulti (name) {return this._events[name]['listeners'] != null},
    get (name) {
      if (!this.has(name)) {console.warn(`No event with name '${name}'`); return null}
      return this._events[name];
    },
    listeners (name) {
      if (!this.has(name)) {console.warn(`No event with name '${name}'`); return null}
      return this.hasMulti(name) ? this.get(name).listeners : this.get(name).listener;
    },
    once (ename, efn) {this.on(ename, efn); this._events[ename].once = !0; return this},
    emit (name, ...args) {
      if (!this.has(name)) {throw new Error(`No event with name '${name}'`)}
      let g = this.get(name);
      if (g['listener'] == null) {
        for (let i = 0, len = g.listeners.length; i < len; i++) {
          let lis = g.listeners[i];
          lis(...args);
        }
      } else {
        g.listener(...args);
      }
      if (g.once) {delete this._events[name]}
      return this;
    }
  }
  if (n) {mw(ev); return}
  mw('events', ev);
});
