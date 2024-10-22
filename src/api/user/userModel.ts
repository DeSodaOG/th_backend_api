import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.string(),
  referrerID: z.string(),
  parentReferrerID: z.string(),
  affiliateAmount: z.number(),
  subAffiliateAmount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  score: z.number()
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: z.string() }),
});

export const CreateUserSchema = z.object({
  body: z.object({
    id: z.string(),
    // pfpURL: z.string().url(),
    referrerID: z.string(),
  }),
});