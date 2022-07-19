import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCustomer from "app/customers/mutations/createCustomer"
import { CustomerForm, FORM_ERROR } from "app/customers/components/CustomerForm"
import { createCustomerSchema } from "app/customers/validations"

const NewCustomerPage: BlitzPage = () => {
  const router = useRouter()
  const [createCustomerMutation] = useMutation(createCustomer)

  return (
    <div>
      <CustomerForm
        submitText="Create customer"
        schema={createCustomerSchema}
        initialValues={{
          firstname: "",
          lastname: "",
        }}
        onSubmit={async (values) => {
          try {
            const customer = await createCustomerMutation(values)
            router.push(Routes.ShowCustomerPage({ customerId: customer.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CustomersPage()}>
          <a>Customers</a>
        </Link>
      </p>
    </div>
  )
}

NewCustomerPage.authenticate = true
NewCustomerPage.getLayout = (page) => <Layout title={"Create New Customer"}>{page}</Layout>

export default NewCustomerPage
