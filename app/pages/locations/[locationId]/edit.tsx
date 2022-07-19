import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLocation from "app/locations/queries/getLocation"
import updateLocation from "app/locations/mutations/updateLocation"
import { LocationForm, FORM_ERROR } from "app/locations/components/LocationForm"

export const EditLocation = () => {
  const router = useRouter()
  const locationId = useParam("locationId", "number")
  const [location, { setQueryData }] = useQuery(
    getLocation,
    { id: locationId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateLocationMutation] = useMutation(updateLocation)

  return (
    <>
      <Head>
        <title>Edit Location {location.id}</title>
      </Head>

      <div>
        <h1>Edit Location {location.id}</h1>
        <pre>{JSON.stringify(location, null, 2)}</pre>

        <LocationForm
          submitText="Update Location"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateLocation}
          initialValues={location}
          onSubmit={async (values) => {
            try {
              const updated = await updateLocationMutation({
                id: location.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowLocationPage({ locationId: updated.id }))
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

const EditLocationPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditLocation />
      </Suspense>

      <p>
        <Link href={Routes.LocationsPage()}>
          <a>Locations</a>
        </Link>
      </p>
    </div>
  )
}

EditLocationPage.authenticate = true
EditLocationPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditLocationPage
