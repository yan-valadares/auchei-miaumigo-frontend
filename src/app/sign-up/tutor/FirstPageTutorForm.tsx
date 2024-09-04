import { MoveRight } from 'lucide-react'
import type { Control } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { CpfInput } from '@/components/ui/cpf-input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

import { SignUpTutorFormData } from './SignUpTutorForm'

export const firstPageTutorFormSchema = z
  .object({
    firstName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
    lastName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
    cpf: z.string().min(11).max(11),
    password: z
      .string()
      .min(8, { message: 'Mínimo de 8 caracteres' })
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Pelo menos uma maiúscula',
      })
      .refine((value) => /[a-z]/.test(value), {
        message: 'Pelo menos uma minúscula',
      })
      .refine((value) => /[0-9]/.test(value), {
        message: 'Pelo menos um número',
      })
      .refine((value) => /[#?!@$%^&*-]/.test(value), {
        message: 'Pelo menos um caractere especial',
      }),
    confirmPassword: z.string().min(8, { message: 'Mínimo de 8 caracteres ' }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Senhas não iguais',
    path: ['confirmPassword'],
  })

interface FirstPageTutorFormProps {
  control: Control<SignUpTutorFormData>
  handleNextPage: () => void
}

export function FirstPageTutorForm({
  control,
  handleNextPage,
}: FirstPageTutorFormProps) {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-semibold text-darkBlue">
              Email
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
        control={control}
        name="cpf"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-semibold text-darkBlue">
              CPF
            </FormLabel>
            <FormControl>
              <CpfInput placeholder="XXX.XXX.XXX-XX" {...field} />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={control}
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
        control={control}
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
          className="h-12 w-full gap-2 bg-darkBlue text-base font-bold hover:bg-blue-950"
        >
          Continuar
          <MoveRight size={20} />
        </Button>
      </div>
    </>
  )
}
