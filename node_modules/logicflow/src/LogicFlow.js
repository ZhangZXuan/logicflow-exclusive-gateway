module.exports = class LogicFlow {
  constructor(copy) {
    if (copy) {
      this.functionList = copy.functionList;
      this.errFunctionList = copy.errFunctionList;
    } else {
      this.functionList = [];
      this.errFunctionList = [];
    }
    this.funcIndex = 0;
  }

  register(f) {
    this.functionList.push(f);
  }

  registerErr(f) {
    this.errFunctionList.push(f);
  }

  start(store) {
    this.store = store;
    this.funcIndex = 0;
    this.next();
  }

  async next() {
    try {
      this.funcIndex += 1;
      if (this.funcIndex > this.functionList.length) return;
      await this.functionList[this.funcIndex - 1](this.store, this);
    } catch (err) {
      this.store.error = err;
      this.error();
    }
  }

  async error() {
    this.errFunctionList.forEach(async (f) => {
      await f(this.store, this);
    });
  }
};
