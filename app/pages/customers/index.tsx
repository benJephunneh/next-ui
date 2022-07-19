import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCustomers from "app/customers/queries/getCustomers"
import { Button } from "@nextui-org/react"

const ITEMS_PER_PAGE = 100

export const CustomersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ customers, hasMore }] = usePaginatedQuery(getCustomers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            <Link href={Routes.ShowCustomerPage({ customerId: customer.id })}>
              <a>
                {customer.firstname} {customer.lastname}
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <Button.Group size="sm">
        <Button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </Button>
        <Button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </Button>
      </Button.Group>
    </div>
  )
}

const CustomersPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Customers</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCustomerPage()}>
            <a>Create Customer</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CustomersList />
        </Suspense>
      </div>
    </>
  )
}

CustomersPage.authenticate = true
CustomersPage.getLayout = (page) => <Layout>{page}</Layout>

export default CustomersPage
