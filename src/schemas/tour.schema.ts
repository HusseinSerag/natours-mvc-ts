import * as z from "zod";

const findAllTours = z.object({
  query: z
    .object({
      sort: z.string().optional(),
      limit: z.number().optional(),
      fields: z.string().optional(),
      page: z.number().optional(),
    })
    .catchall(z.union([z.string(), z.number()])),
});

type FindAllToursType = z.infer<typeof findAllTours>;

export { findAllTours, FindAllToursType };
