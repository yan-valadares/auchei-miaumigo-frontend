'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MoveRight } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { PhoneInput } from '@/components/ui/phone-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB
const ACCEPTED_FILE_TYPES = ['image/png', 'image/jpg']

const passwordSchema = z
  .string()
  .min(8, { message: 'Mínimo de 8 caracteres' })
  .refine((value) => /[A-Z]/.test(value), {
    message: 'Pelo menos uma maiúscula',
  })
  .refine((value) => /[a-z]/.test(value), {
    message: 'Pelo menos uma minúscula',
  })
  .refine((value) => /[0-9]/.test(value), { message: 'Pelo menos um número' })
  .refine((value) => /[#?!@$%^&*-]/.test(value), {
    message: 'Pelo menos um caractere especial',
  })

const houseNumberSchema = z
  .string()
  .min(8, { message: 'Mínimo de 8 caracteres' })
  .refine((value) => /^\d+$/.test(value), {
    message: 'Apenas números',
  })
  .nullable()

const firstPageFormSchema = z
  .object({
    firstName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
    lastName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
    ngoEmail: z.string().email({
      message: 'Email inválido',
    }),
    ngoName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
    password: passwordSchema,
    confirmPassword: z.string().min(8, { message: 'Mínimo de 8 caracteres ' }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword
    },
    {
      message: 'Senhas não iguais',
      path: ['confirmPassword'],
    },
  )

const fileSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE
  }, 'File size must be less than 3MB')
  .refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file?.type || '')
  }, 'File must be a PNG')

const secondPageFormSchema = z.object({
  phone: z.string().min(10, { message: 'Mínimo 10 dígitos' }),
  streetName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  houseNumber: houseNumberSchema,
  houseType: z.enum(['house', 'apartment']),
  state: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  city: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  logoImage: fileSchema,
})

const signUpNGOFormSchema = firstPageFormSchema.and(secondPageFormSchema)

type SignUpNGOFormData = z.infer<typeof signUpNGOFormSchema>

export function SignUpNGOForm() {
  const [isFirstPage, setIsFirstPage] = useState(false)

  const signUpNGOForm = useForm<SignUpNGOFormData>({
    resolver: zodResolver(
      isFirstPage ? firstPageFormSchema : signUpNGOFormSchema,
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
    },
  })

  const handleNextPage = async () => {
    const isFormValid = await signUpNGOForm.trigger()

    if (isFormValid) {
      setIsFirstPage(false)
    }
  }

  function onSubmit(values: SignUpNGOFormData) {
    console.log(values)
  }

  return (
    <Form {...signUpNGOForm}>
      <form
        onSubmit={signUpNGOForm.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {isFirstPage ? (
          <>
            <FormField
              control={signUpNGOForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold text-darkBlue">
                    Primeiro nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="João"
                      {...field}
                      className="text-base text-darkBlue"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={signUpNGOForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold text-darkBlue">
                    Último nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pereira"
                      {...field}
                      className="text-base text-darkBlue"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={signUpNGOForm.control}
              name="ngoEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold text-darkBlue">
                    Email da ONG
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="nomedaong@email.com.br"
                      {...field}
                      className="text-base text-darkBlue"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={signUpNGOForm.control}
              name="ngoName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold text-darkBlue">
                    Nome da ONG
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mundo dos Pets"
                      {...field}
                      className="text-base text-darkBlue"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={signUpNGOForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold text-darkBlue">
                    Senha
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="************" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={signUpNGOForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold text-darkBlue">
                    Confirmar senha
                  </FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="************" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="flex h-12 w-full gap-2 text-xl font-semibold">
              <Button disabled className="h-12 w-full bg-transparent"></Button>
              <Button
                onClick={handleNextPage}
                className="h-12 w-full gap-1 bg-darkBlue hover:bg-blue-950"
              >
                Continuar
                <MoveRight size={20} />
              </Button>
            </div>
          </>
        ) : (
          <>
            <FormField
              control={signUpNGOForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold text-darkBlue">
                    Telefone
                  </FormLabel>
                  <FormControl>
                    <PhoneInput placeholder="(XX) XXXXX-XXXX" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={signUpNGOForm.control}
              name="streetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold text-darkBlue">
                    Logradouro
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Rua das ruas"
                      {...field}
                      className="text-base text-darkBlue"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="flex h-auto w-full items-end justify-between gap-2">
              <FormField
                control={signUpNGOForm.control}
                name="houseNumber"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel className="text-xl font-semibold text-darkBlue">
                      Número
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="9999"
                        {...field}
                        value={field.value || ''}
                        className="h-full w-full text-base text-darkBlue"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpNGOForm.control}
                name="houseType"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="h-full w-full text-base text-darkBlue">
                          <SelectValue placeholder="Tipo de casa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="house">Casa</SelectItem>
                        <SelectItem value="apartment">Apartamento</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
      </form>
    </Form>
  )
}
