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

// src/assets/TeleHunterFactoryWrapper.ts
var TeleHunterFactoryWrapper_exports = {};
__export(TeleHunterFactoryWrapper_exports, {
  TeleHunterFactory: () => TeleHunterFactory
});
module.exports = __toCommonJS(TeleHunterFactoryWrapper_exports);
var import_ton_core = require("ton-core");
var TeleHunterFactory = class {
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
      totalUsers: stack.readBigNumber()
    };
  }
  async getHunterItemAddr(provider, tgID) {
    let builder = new import_ton_core.TupleBuilder();
    builder.writeString(tgID);
    const { stack } = await provider.get("getHunterItemAddr", builder.build());
    return {
      address: stack.readAddress()
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TeleHunterFactory
});
//# sourceMappingURL=TeleHunterFactoryWrapper.js.map