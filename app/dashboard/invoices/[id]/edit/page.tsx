import Form from '@/app/ui/invoices/edit-form'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface EditInvoiceProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Edit Invoice',
  description: 'Edit invoice page'
}

export default async function Page({ params }: EditInvoiceProps) {
  const { id } = await params

  const [invoice, customers] = await Promise.allSettled([
    fetchInvoiceById(id),
    fetchCustomers()
  ])

  if (invoice.status === 'rejected' || customers.status === 'rejected') {
    notFound()
  }

  if (
    (invoice.status === 'fulfilled' && invoice.value === undefined) ||
    (customers.status === 'fulfilled' && customers.value === undefined)
  ) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true
          }
        ]}
      />
      <Form invoice={invoice.value} customers={customers.value} />
    </main>
  )
}
