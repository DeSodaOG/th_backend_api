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

// src/api/user/userModel.ts
var userModel_exports = {};
__export(userModel_exports, {
  CreateUserSchema: () => CreateUserSchema,
  GetUserSchema: () => GetUserSchema,
  UserSchema: () => UserSchema
});
module.exports = __toCommonJS(userModel_exports);
var import_zod_to_openapi = require("@asteasolutions/zod-to-openapi");
var import_zod = require("zod");
(0, import_zod_to_openapi.extendZodWithOpenApi)(import_zod.z);
var UserSchema = import_zod.z.object({
  id: import_zod.z.string(),
  referrerid: import_zod.z.string(),
  parentreferrerid: import_zod.z.string(),
  affiliateamount: import_zod.z.number(),
  subaffiliateamount: import_zod.z.number(),
  createdat: import_zod.z.date(),
  updatedat: import_zod.z.date(),
  score: import_zod.z.number()
});
var GetUserSchema = import_zod.z.object({
  params: import_zod.z.object({ id: import_zod.z.string() })
});
var CreateUserSchema = import_zod.z.object({
  body: import_zod.z.object({
    id: import_zod.z.string(),
    tgHandle: import_zod.z.string(),
    referrerID: import_zod.z.string(),
    sig: import_zod.z.string()
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserSchema,
  GetUserSchema,
  UserSchema
});
//# sourceMappingURL=userModel.js.map