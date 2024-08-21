'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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

const signUpNGOFormSchema = z
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

type SignUpNGOFormData = z.infer<typeof signUpNGOFormSchema>

export function SignUpNGOForm() {
  const signUpNGOForm = useForm<SignUpNGOFormData>({
    resolver: zodResolver(signUpNGOFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      ngoEmail: '',
      ngoName: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: SignUpNGOFormData) {
    console.log(values)
  }

  return (
    <Form {...signUpNGOForm}>
      <form
        onSubmit={signUpNGOForm.handleSubmit(onSubmit)}
        className="space-y-4"
      >
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
        <Button
          type="submit"
          className="flex h-12 w-full bg-darkBlue text-xl font-semibold hover:bg-blue-950"
        >
          Login
        </Button>
      </form>
    </Form>
  )
}
