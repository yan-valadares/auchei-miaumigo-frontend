'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Form } from '@/components/ui/form'

import { firstPageFormSchema, FirstPageNGOForm } from './FirstPageNGOForm'
import { secondPageFormSchema, SecondPageNGOForm } from './SecondPageNGOForm'

const signUpNGOFormSchema = firstPageFormSchema.and(secondPageFormSchema)

export type SignUpNGOFormData = z.infer<typeof signUpNGOFormSchema>

export function SignUpNGOForm() {
  const [isFirstPage, setIsFirstPage] = useState(false)
  const [formData, setFormData] = useState<Partial<SignUpNGOFormData>>({})

  const signUpNGOForm = useForm<SignUpNGOFormData>({
    resolver: zodResolver(
      isFirstPage ? firstPageFormSchema : secondPageFormSchema,
    ),
    defaultValues: {
      firstName: '',
      lastName: '',
      ngoEmail: '',
      ngoName: '',
      password: '',
      confirmPassword: '',
      phone: '',
      streetName: '',
      state: '',
      city: '',
      houseType: 'house',
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
        className="mx-4 space-y-4 sm:mx-0"
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
