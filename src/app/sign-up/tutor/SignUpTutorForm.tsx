'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { Form } from '@/components/ui/form'

import { firstPageTutorFormSchema, FirstPageTutorForm } from './FirstPageTutorForm'
import { secondPageTutorFormSchema, SecondPageTutorForm } from './SecondPageTutorForm'

const signUpTutorFormSchema = firstPageTutorFormSchema.and(secondPageTutorFormSchema)

export type SignUpTutorFormData = z.infer<typeof signUpTutorFormSchema>

export function SignUpTutorForm() {
  const [isFirstPage, setIsFirstPage] = useState(true)
  const [formData, setFormData] = useState<Partial<SignUpTutorFormData>>({})

  const signUpTutorForm = useForm<SignUpTutorFormData>({
    resolver: zodResolver(
      isFirstPage ? firstPageTutorFormSchema : secondPageTutorFormSchema,
    ),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      cpf: '',
      password: '',
      confirmPassword: '',
      phone: '',
      streetName: '',
      state: '',
      city: '',
      houseType: 'house',
      avatar: undefined,
    },
  })

  const handleNextPage = async () => {
    const isFormValid = await signUpTutorForm.trigger()
    if (isFormValid) {
      setFormData((prevData) => ({
        ...prevData,
        ...signUpTutorForm.getValues(),
      }))
      setIsFirstPage(false)
    }
  }

  function handlePreviousPage() {
    setIsFirstPage(true)
  }

  function onSubmit(values: Partial<SignUpTutorFormData>) {
    const combinedData = {
      ...formData,
      ...values,
    }

    console.log(combinedData)
  }
 
  return (
    <Form {...signUpTutorForm}>
      <form
        onSubmit={signUpTutorForm.handleSubmit(onSubmit)}
        className="mx-2 space-y-4 sm:mx-0"
      >
        
        {isFirstPage ? (
          <FirstPageTutorForm
            control={signUpTutorForm.control}
            handleNextPage={handleNextPage}
          />
        ) : (
          <SecondPageTutorForm
            control={signUpTutorForm.control}
            handlePreviousPage={handlePreviousPage}
          />
        )}
      </form>
    </Form>
  )
}
