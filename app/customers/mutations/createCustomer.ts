import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreateCustomer = z.object({
  firstname: z.string(),
  lastname: z.string(),
  // locations: z.object({
  //   number: z.number(),
  //   street: z.string(),
  //   city: z.string(),
  //   state: z.string(),
  //   zipcode: z.number(),
  //   lot: z.number().optional(),
  //   block: z.string().optional(),
  //   parcel: z.string().optional(),
  // }),
})

export default resolver.pipe(resolver.zod(CreateCustomer), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const customer = await db.customer.create({
    data: input,
  })

  return customer
})
