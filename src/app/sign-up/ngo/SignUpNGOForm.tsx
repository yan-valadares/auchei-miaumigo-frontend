'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Form } from '@/components/ui/form'

import { FirstPageNGOForm, firstPageNGOFormSchema } from './FirstPageNGOForm'
import { SecondPageNGOForm, secondPageNGOFormSchema } from './SecondPageNGOForm'

const signUpNGOFormSchema = firstPageNGOFormSchema.and(secondPageNGOFormSchema)

export type SignUpNGOFormData = z.infer<typeof signUpNGOFormSchema>

export function SignUpNGOForm() {
  const [isFirstPage, setIsFirstPage] = useState(true)
  const [formData, setFormData] = useState<Partial<SignUpNGOFormData>>({})

  const signUpNGOForm = useForm<SignUpNGOFormData>({
    resolver: zodResolver(
      isFirstPage ? firstPageNGOFormSchema : secondPageNGOFormSchema,
    ),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      ngoName: '',
      password: '',
      confirmPassword: '',
      phone: '',
      streetName: '',
      state: '',
      city: '',
      logoImage: undefined,
    },
  })

  const handleNextPage = async () => {
    const isFormValid = await signUpNGOForm.trigger()
    if (isFormValid) {
      setFormData((prevData) => ({
        ...prevData,
        ...signUpNGOForm.getValues(),
      }))
      setIsFirstPage(false)
    }
  }

  function handlePreviousPage() {
    setIsFirstPage(true)
  }

  function onSubmit(values: Partial<SignUpNGOFormData>) {
    const combinedData = {
      ...formData,
      ...values,
    }

    console.log(combinedData)
  }

  return (
    <Form {...signUpNGOForm}>
      <form
        onSubmit={signUpNGOForm.handleSubmit(onSubmit)}
        className="mx-2 space-y-4 sm:mx-0"
      >
        {isFirstPage ? (
          <FirstPageNGOForm
            control={signUpNGOForm.control}
            handleNextPage={handleNextPage}
          />
        ) : (
          <SecondPageNGOForm
            control={signUpNGOForm.control}
            handlePreviousPage={handlePreviousPage}
          />
        )}
      </form>
    </Form>
  )
}
