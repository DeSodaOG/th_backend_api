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

// src/common/utils/chainHandlers.ts
var chainHandlers_exports = {};
__export(chainHandlers_exports, {
  verifyPayment: () => verifyPayment,
  verifySig: () => verifySig
});
module.exports = __toCommonJS(chainHandlers_exports);
var import_ton = require("ton");
var import_ton_core2 = require("ton-core");

// src/assets/TeleHunterFactoryWrapper.ts
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

// src/assets/HunterItemWrapper.ts
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

// src/common/utils/chainHandlers.ts
var import_ethers = require("ethers");
async function verifyPayment(id, joinAddress) {
  const client = new import_ton.TonClient({
    endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
    apiKey: "509a1c3746f03dd5cb9d8192209467d47d8f0392faa7077427520b2774e45dee"
  });
  try {
    const factory = await client.open(new TeleHunterFactory(import_ton_core2.Address.parse("EQB_xLfZPt4T1xtHYSVr6hrpt6evIk-Thty9i-D-gss4w5YN")));
    const hunterItem = await factory.getHunterItemAddr(id);
    const hunterContract = await client.open(new HunterItemWrapper(
      hunterItem.address
    ));
    const status = await hunterContract.getBasicInfo();
    console.log(status);
    return status.isJoined;
  } catch (error) {
    return false;
  }
}
function verifySig(message, sig) {
  const address = import_ethers.ethers.verifyMessage(message, sig);
  return address.toLowerCase() == process.env.ADDRESS;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  verifyPayment,
  verifySig
});
//# sourceMappingURL=chainHandlers.js.map