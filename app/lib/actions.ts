'use server'

import { sql } from '@vercel/postgres'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { FormState } from '../hooks/useInvoiceForm'

const FormSchema = z.object({
  id: z
    .string({
      message: 'Please enter a valid UUID',
      required_error: 'ID is required'
    })
    .uuid(),
  customerId: z
    .string({
      message: 'Please select a customer',
      required_error: 'Customer ID is required',
      invalid_type_error: 'Please select a valid customer'
    })
    .uuid(),
  amount: z.coerce
    .number({
      required_error: 'Amount is required'
    })
    .gt(0, { message: 'Please enter an amount greater than $0' }),
  status: z.enum(['pending', 'paid'], {
    message: 'Please select an invoice status',
    invalid_type_error: 'Please select a valid invoice status'
  }),
  date: z.string()
})

const CreateInvoice = FormSchema.omit({ id: true, date: true })

export const createInvoice = async (
  _prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const rawFormData = Object.fromEntries(formData)

  const validatedFields = CreateInvoice.safeParse(rawFormData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      values: rawFormData,
      message: 'Missing fields. Failed to create invoice.'
    }
  }

  // prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data

  const amountInCents = Math.round(amount * 100)
  const [date] = new Date().toISOString().split('T')

  // insert data into the database
  try {
    await sql`BEGIN`
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `
    await sql`COMMIT`
  } catch (error) {
    await sql`ROLLBACK`

    // if an error occurs, return an error message
    return {
      message: 'Database Error: Failed to Create Invoice.'
    }
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true })

export const updateInvoice = async (id: string, formData: FormData) => {
  const rawFormData = Object.fromEntries(formData)

  const { customerId, amount, status } = UpdateInvoice.parse(rawFormData)

  const amountInCents = Math.round(amount * 100)

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `
    await sql`COMMIT`
  } catch (err) {
    return { message: 'Database Error: Failed to Update Invoice.' }
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

export async function deleteInvoice(id: string) {
  try {
    await sql`BEGIN`
    await sql`DELETE FROM invoices WHERE id = ${id}`
    await sql`COMMIT`

    revalidatePath('/dashboard/invoices')

    return { message: 'Invoice deleted successfully' }
  } catch (error) {
    await sql`ROLLBACK`

    return { message: 'Database Error: Failed to Delete Invoice' }
  }
}
