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

const loginFormSchema = z.object({
  email: z.string().email({
    message: 'Email inválido',
  }),
  password: passwordSchema,
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: LoginFormData) {
    console.log(values)
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-semibold text-darkBlue">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="nome@email.com.br"
                  {...field}
                  className="text-base text-darkBlue"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
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
