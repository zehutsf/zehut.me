export default class Subscriber {
  constructor() {
    this._listeners = {};
    this._uniq = 1;
  }

  subscribe(name, handler) {
    if (!this._listeners[name]) {
      this._listeners[name] = {};
    }

    const key = this._uniq++;
    this._listeners[name][key] = handler;
    return () => this._unsubsribe(name, key);
  }

  notify(name, ...args) {
    const listenerMap = this._listeners[name];
    if (!listenerMap) {
      return;
    }
    
    Object.keys(listenerMap).forEach(key => {
        listenerMap[key](...args);
    });
  }

  _unsubscribe(name, val) {
    delete this._listeners[name][val];
  }
}
