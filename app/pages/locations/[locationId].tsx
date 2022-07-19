import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getLocation from "app/locations/queries/getLocation"
import deleteLocation from "app/locations/mutations/deleteLocation"

export const Location = () => {
  const router = useRouter()
  const locationId = useParam("locationId", "number")
  const [deleteLocationMutation] = useMutation(deleteLocation)
  const [location] = useQuery(getLocation, { id: locationId })

  return (
    <>
      <Head>
        <title>Location {location.id}</title>
      </Head>

      <div>
        <h1>Location {location.id}</h1>
        <pre>{JSON.stringify(location, null, 2)}</pre>

        <Link href={Routes.EditLocationPage({ locationId: location.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteLocationMutation({ id: location.id })
              router.push(Routes.LocationsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowLocationPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.LocationsPage()}>
          <a>Locations</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Location />
      </Suspense>
    </div>
  )
}

ShowLocationPage.authenticate = true
ShowLocationPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowLocationPage
