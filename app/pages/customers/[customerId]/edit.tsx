import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCustomer from "app/customers/queries/getCustomer"
import updateCustomer from "app/customers/mutations/updateCustomer"
import { CustomerForm, FORM_ERROR } from "app/customers/components/CustomerForm"
import { Button } from "@nextui-org/react"
import deleteCustomer from "app/customers/mutations/deleteCustomer"

export const EditCustomer = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [customer, { setQueryData }] = useQuery(
    getCustomer,
    { id: customerId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCustomerMutation] = useMutation(updateCustomer)
  const [deleteCustomerMutation] = useMutation(deleteCustomer)

  return (
    <>
      <Head>
        <title>
          Edit {customer.firstname} {customer.lastname}
        </title>
      </Head>

      <div>
        <h1>
          Edit {customer.firstname} {customer.lastname}
        </h1>
        <Button
          size={"xs"}
          color={"error"}
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCustomerMutation({ id: customer.id })
              router.push(Routes.CustomersPage())
            }
          }}
        >
          Delete
        </Button>
        <pre>{JSON.stringify(customer, null, 2)}</pre>

        <CustomerForm
          submitText="Update Customer"
          // schema={UpdateCustomer}
          initialValues={customer}
          onSubmit={async (values) => {
            try {
              const updated = await updateCustomerMutation({
                id: customer.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowCustomerPage({ customerId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditCustomerPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCustomer />
      </Suspense>

      <p>
        <Link href={Routes.CustomersPage()}>
          <a>Customers</a>
        </Link>
      </p>
    </div>
  )
}

EditCustomerPage.authenticate = true
EditCustomerPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCustomerPage
