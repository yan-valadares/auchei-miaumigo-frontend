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

const passwordValidation =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const loginFormSchema = z.object({
  username: z.string().email({
    message: 'Email inválido',
  }),
  password: z.string().regex(passwordValidation, {
    message:
      'A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  }),
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(values: LoginFormData) {
    console.log(values)
  }

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onSubmit)}
        className="w-3/4 space-y-6"
      >
        <FormField
          control={loginForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-darkBlue text-xl font-semibold">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="nome@email.com"
                  {...field}
                  className="text-darkBlue text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-darkBlue text-xl font-semibold">
                Senha
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  {...field}
                  className="text-darkBlue text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-darkBlue flex h-12 w-full text-xl font-semibold hover:bg-blue-950"
        >
          Login
        </Button>
      </form>
    </Form>
  )
}
