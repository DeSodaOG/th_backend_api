import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.string(),
  referrerid: z.string(),
  parentreferrerid: z.string(),
  affiliateamount: z.number(),
  subaffiliateamount: z.number(),
  createdat: z.date(),
  updatedat: z.date(),
  score: z.number()
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: z.string() }),
});

export const CreateUserSchema = z.object({
  body: z.object({
    id: z.string(),
    tgHandle: z.string(),
    referrerID: z.string(),
    sig: z.string()
  }),
});

export const ClickUserSchema = z.object({
  body: z.object({
    id: z.string(),
    name: z.string(),
    referrerID: z.string(),
  }),
});