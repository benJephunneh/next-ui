import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import getCustomer from "app/customers/queries/getCustomer"
import { Head, useQuery } from "blitz"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function LocationForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  // console.log(JSON.stringify(props, null, 2))
  // console.log("LocationForm customerId: %d", props.initialValues.customerId)
  // const [customer] = useQuery(getCustomer, { id: Number(props.customerId) })
  // console.log(JSON.stringify(customer, null, 2))
  // const customerName = `${customer.firstname} ${customer.lastname}`
  // console.log("customerName: %s", customerName)
  return (
    <Form<S> {...props}>
      <LabeledTextField
        autoFocus
        name="number"
        type="number"
        label="House number"
        placeholder="6253"
      />
      <LabeledTextField name="street" label="Street" placeholder="Crestwood Dr" />
      <LabeledTextField name="city" label="City" placeholder="Tallahassee" />
      <LabeledTextField name="state" label="State" placeholder="FL" />
      <LabeledTextField name="zipcode" type="number" label="Zipcode" placeholder="32351" />
      <LabeledTextField name="lot" type="number" label="Lot" />
      <LabeledTextField name="block" label="Block" />
      <LabeledTextField name="parcel" label="Parcel ID" />
      <LabeledTextField
        name="customerId"
        label="Customer ID"
        disabled
        placeholder={props.initialValues.customerId}
        value={props.initialValues.customerId}
      />
    </Form>
  )
}
