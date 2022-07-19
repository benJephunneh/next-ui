import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCustomer from "app/customers/queries/getCustomer"
import getLocations from "app/locations/queries/getLocations"
import { Button, Table } from "@nextui-org/react"

export const Customer = () => {
  const router = useRouter()
  const customerId = useParam("customerId", "number")
  const [customer] = useQuery(getCustomer, { id: customerId })
  const [locations] = useQuery(getLocations, { where: { customerId: customerId } })

  const columns = [
    {
      key: "number",
      label: "House number",
    },
    {
      key: "street",
      label: "Street",
    },
    {
      key: "city",
      label: "City",
    },
    {
      key: "state",
      label: "State",
    },
    {
      key: "zipcode",
      label: "Zipcode",
    },
    {
      key: "block",
      label: "Block",
    },
    {
      key: "lot",
      label: "Lot",
    },
    {
      key: "parcel",
      label: "Parcel ID",
    },
  ]

  return (
    <>
      <Head>
        <title>
          {customer.firstname} {customer.lastname}
        </title>
      </Head>

      <div>
        <h1>
          {customer.firstname} {customer.lastname}
        </h1>
        <Button.Group size="sm" color="success">
          <Button onPress={() => router.push(Routes.EditCustomerPage({ customerId: customerId }))}>
            Edit
          </Button>
          <Button
            onPress={() => router.push(Routes.NewLocationPage({ customerId: customerId }))}
            size={"sm"}
            color={"success"}
          >
            Add location
          </Button>
        </Button.Group>
        <Table
          aria-label="Location list"
          compact
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header columns={columns}>
            {(column) => <Table.Column key={column.key}>{column.label}</Table.Column>}
          </Table.Header>
          <Table.Body items={locations.locations}>
            {(item) => (
              <Table.Row key={item.key}>
                {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </>
  )
}

const ShowCustomerPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CustomersPage()}>
          <a>Customers</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Customer />
      </Suspense>
    </div>
  )
}

ShowCustomerPage.authenticate = true
ShowCustomerPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCustomerPage
