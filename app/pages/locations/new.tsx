import {
  Link,
  useRouter,
  useMutation,
  BlitzPage,
  Routes,
  useQuery,
  useRouterQuery,
  Head,
} from "blitz"
import Layout from "app/core/layouts/Layout"
import createLocation from "app/locations/mutations/createLocation"
import { LocationForm, FORM_ERROR } from "app/locations/components/LocationForm"
import getCustomer from "app/customers/queries/getCustomer"
import db from "db"
import { createLocationSchema } from "app/locations/validations"

const NewLocationPage: BlitzPage = (props) => {
  const router = useRouter()
  const { customerId } = useRouterQuery() // customerId comes out as a string
  console.log("new.tsx: customerId: %d", customerId)
  const [customer] = useQuery(getCustomer, { id: Number(customerId) })
  // console.log(JSON.stringify(customer, null, 2))
  // const customerName = `${customer.firstname} ${customer.lastname}`
  // console.log("customerName: %s", customerName)
  const [createLocationMutation] = useMutation(createLocation)

  return (
    <div>
      <h1>
        {customer.firstname} {customer.lastname}
      </h1>
      <h2>Create new location</h2>

      <LocationForm
        submitText="Create Location"
        schema={createLocationSchema}
        initialValues={{ customerId: Number(customerId) }}
        onSubmit={async (values) => {
          try {
            console.log(JSON.stringify(values, null, 2))
            const location = await createLocationMutation(values)
            // router.push(Routes.ShowLocationPage({ locationId: location.id }))
            router.push(Routes.ShowCustomerPage({ customerId: customerId }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.LocationsPage()}>
          <a>Locations</a>
        </Link>
      </p>
    </div>
  )
}

NewLocationPage.authenticate = true
NewLocationPage.getLayout = (page) => <Layout title={"Create New Location"}>{page}</Layout>

export default NewLocationPage
