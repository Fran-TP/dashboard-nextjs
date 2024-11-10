import { useActionState, useEffect, useState } from 'react'

export type InvoiceValues = {
  customerId?: string
  amount?: number
  status?: 'pending' | 'paid'
}

export type InvoiceErrors = {
  customerId?: string[]
  amount?: string[]
  status?: string[]
}

export type FormState = {
  values?: InvoiceValues
  errors?: InvoiceErrors
  message?: string | null
}

export function useInvoiceForm(
  action: (prevState: FormState, formData: FormData) => Promise<FormState>,
  initialState: FormState
) {
  const [state, formAction, isPending] = useActionState(action, initialState)

  const [values, setValues] = useState<InvoiceValues | undefined>(state?.values)
  const [errors, setErrors] = useState<InvoiceErrors | undefined>(state?.errors)

  useEffect(() => {
    setValues(state?.values)
    setErrors(state?.errors)
  }, [state])

  const handleChange = (field: keyof InvoiceValues, value: unknown) => {
    setValues(prevValues => ({ ...prevValues, [field]: value }))

    if (errors?.[field]) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: undefined }))
    }
  }

  return {
    values,
    errors,
    isPending,
    formAction,
    handleChange
  }
}
