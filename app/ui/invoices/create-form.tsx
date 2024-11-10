'use client'

import type { CustomerField } from '@/app/lib/definitions'
import Link from 'next/link'
import { useActionState, useEffect, useState } from 'react'
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'
import { Button } from '@/app/ui/button'
import { createInvoice, type State } from '@/app/lib/actions'
import ErrorMessage from '../forms/error-message'
import clsx from 'clsx'
import { Spin } from '../icons/spin'

const initialState: State = {
  message: null,
  errors: {},
  values: {}
}

export default function Form({ customers }: { customers: CustomerField[] }) {
  const [state, formAction, isPending] = useActionState(
    createInvoice,
    initialState
  )
  const [errors, setErrors] = useState<State['errors']>(state?.errors)
  const [values, setValues] = useState<State['values']>(state?.values)

  useEffect(() => {
    setErrors(state?.errors)
    setValues(state?.values)
  }, [state])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = event.target.value
    setValues({ ...values, customerId: selectedUserId })

    if (errors?.customerId) {
      const updatedErrors = { ...errors, customerId: undefined }

      setErrors(updatedErrors)
    }
  }

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-2">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              value={values?.customerId}
              onChange={handleSelectChange}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="peer-focus:text-gray-900 pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <ErrorMessage id="customer-error" message={errors?.customerId} />
        </div>

        {/* Invoice Amount */}
        <div className="mb-2">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={values?.amount}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={() => {
                  if (errors?.amount) {
                    setErrors({ ...errors, amount: undefined })
                  }
                }}
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <ErrorMessage id="amount-error" message={errors?.amount} />
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  defaultChecked={values?.status === 'pending'}
                  onChange={() => {
                    if (errors?.status) {
                      setErrors({ ...errors, status: undefined })
                    }
                  }}
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  onChange={() => {
                    if (errors?.status) {
                      setErrors({ ...errors, status: undefined })
                    }
                  }}
                  defaultChecked={values?.status === 'paid'}
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <ErrorMessage id="status-error" message={errors?.status} />
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button
          type="submit"
          className={clsx('w-36 gap-1', { 'cursor-not-allowed': isPending })}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Spin />
              Processing...
            </>
          ) : (
            'Create Invoice'
          )}
        </Button>
      </div>
    </form>
  )
}
