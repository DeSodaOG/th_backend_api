"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/assets/HunterItemWrapper.ts
var HunterItemWrapper_exports = {};
__export(HunterItemWrapper_exports, {
  HunterItemWrapper: () => HunterItemWrapper
});
module.exports = __toCommonJS(HunterItemWrapper_exports);
var HunterItemWrapper = class {
  constructor(address, init) {
    this.address = address;
    this.init = init;
  }
  async getOwner(provider) {
    const { stack } = await provider.get("owner", []);
    return {
      owner: stack.readAddress()
    };
  }
  async getBasicInfo(provider) {
    const { stack } = await provider.get("getBasicInfo", []);
    return {
      isJoined: stack.readBoolean(),
      walletAddr: stack.readAddress()
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HunterItemWrapper
});
//# sourceMappingURL=HunterItemWrapper.js.map