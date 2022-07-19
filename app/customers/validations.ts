import { CreateCustomer } from "./mutations/createCustomer"

// export const firstname = z.string().transform((str) => str.trim)

// export const lastname = z.string().transform((str) => str.trim)

// export const NewCustomer = z.object({
//   firstname,
//   lastname,
// })

// export const UpdateCustomer = z.object({
//   id: z.number(),
//   firstname,
//   lastname,
// })

export const createCustomerSchema = CreateCustomer
