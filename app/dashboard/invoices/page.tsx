import Pagination from '@/app/ui/invoices/pagination'
import Search from '@/app/ui/search'
import Table from '@/app/ui/invoices/table'
import { CreateInvoice } from '@/app/ui/invoices/buttons'
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'
import { Suspense } from 'react'
import { fetchInvoicesPages } from '@/app/lib/data'

interface SearchProps {
  query?: string
  page?: string
}
interface PageProps {
  searchParams?: Promise<SearchProps>
}

export default async function Page({ searchParams }: PageProps) {
  const invoiceSearchParams = await searchParams

  const query = invoiceSearchParams?.query ?? ''
  const currentPage = Number(invoiceSearchParams?.page ?? '1')

  const totalPages = await fetchInvoicesPages(query)

  return (
    <div className="w-full">
      <h1 className="text-2xl">Invoices</h1>
      <div className="flex w-full items-center justify-between" />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
