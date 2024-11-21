import { fetchCustomersPages } from '@/app/lib/data'
import CustomersTable from '@/app/ui/customers/table'
import Pagination from '@/app/ui/invoices/pagination'
import Search from '@/app/ui/search'
import { CustomersTableSkeleton } from '@/app/ui/skeletons'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Customers',
  description: 'Customers page'
}

interface SearchProps {
  query?: string
  page?: string
}

interface PageProps {
  searchParams?: Promise<SearchProps>
}

const Page = async ({ searchParams }: PageProps) => {
  const customerQueryParams = await searchParams

  const query = customerQueryParams?.query ?? ''
  const currentPage = Number(customerQueryParams?.page ?? '1')

  const totalPages = await fetchCustomersPages(query)

  return (
    <main className="w-full">
      <h1 className="mb-8 text-xl md:text-2xl">Customers</h1>
      <Search placeholder="Search customers..." />
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
      {totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </main>
  )
}

export default Page
