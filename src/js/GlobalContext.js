import Debug from "./utils/Debug";

let instance = null;

export default class GlobalContext {
  constructor() {
    if (!!instance) return instance;
    instance = this;

    this.debug = new Debug();
  }
}
