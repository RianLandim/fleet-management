import { z } from "zod";

export const CreateTruckValidator = z.object({
  model: z.string(),
  fabricator: z.string(),
  plate: z.string(),
  color: z.string(),
  year: z.string(),
  renavam: z.string(),
  category: z.enum(["A", "B", "C", "D", "E"]),
  isSecured: z.boolean(),
  companyId: z.string(),
  averageConsume: z.number().nullish(),
});

export type CreateTruckValidatorProps = z.infer<typeof CreateTruckValidator>;
