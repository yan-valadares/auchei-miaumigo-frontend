'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MoveLeft, MoveRight } from 'lucide-react'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { CepInput } from '@/components/ui/cep-input'
import { ImageUploadInput } from '@/components/ui/file-input'
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
import LocationContext from '@/contexts/LocationContext'

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

  .refine((value) => /^\d+$/.test(value), {
    message: 'Apenas números',
  })
  .nullable()

const cepNumberSchema = z
  .string()
  .min(8)
  .max(8, { message: '8 caracteres' })
  .refine((value) => /^\d+$/.test(value), {
    message: 'Apenas números',
  })

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
  }, 'Tamanho do arquivo menor que 3MB')
  .refine((file) => {
    return ACCEPTED_FILE_TYPES.includes(file?.type || '')
  }, 'Tipos de arquivos: PNG / JPG')

const secondPageFormSchema = z.object({
  phone: z.string().min(10, { message: 'Mínimo 10 dígitos' }),
  cep: cepNumberSchema,
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
  const [isFirstPage, setIsFirstPage] = useState(true)
  const { cities, states, selectedState, setSelectedState } =
    useContext(LocationContext)

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

  function handlePreviousPage() {
    setIsFirstPage(true)
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
                className="h-12 w-full gap-2 bg-darkBlue text-base font-bold hover:bg-blue-950"
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
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold text-darkBlue">
                    Cep
                  </FormLabel>
                  <FormControl>
                    <CepInput placeholder="XXXXX-XXX" {...field} />
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
            <div className="flex w-full items-end justify-between gap-2">
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
                        className="w-full text-base text-darkBlue"
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
                        <SelectTrigger className="w-full text-base text-darkBlue">
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
            <div className="flex w-full items-end justify-between gap-2">
              <FormField
                name="state"
                render={({ field }) => (
                  <FormItem className="w-1/4">
                    <FormLabel className="text-xl font-semibold text-darkBlue">
                      UF
                    </FormLabel>
                    <Select
                      value={selectedState}
                      onValueChange={(value) => {
                        setSelectedState(value)
                        field.onChange(value)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full text-base text-darkBlue">
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state.id} value={state.sigla}>
                            {state.sigla}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xl font-semibold text-darkBlue">
                      Cidade
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!selectedState}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full text-base text-darkBlue">
                          <SelectValue placeholder="Selecione uma cidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.id.toString()}>
                            {city.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={signUpNGOForm.control}
              name="logoImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-semibold text-darkBlue">
                    Logo
                  </FormLabel>
                  <FormControl>
                    <ImageUploadInput
                      onChange={(file) => field.onChange(file)}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="flex h-12 w-full gap-2 text-xl font-semibold">
              <Button
                onClick={handlePreviousPage}
                className="h-12 w-full gap-2 bg-darkBlue text-base font-bold hover:bg-blue-950"
              >
                <MoveLeft size={20} />
                Anterior
              </Button>
              <Button className="h-12 w-full gap-2 bg-green-400 text-base font-bold hover:bg-green-500">
                Concluir
              </Button>
            </div>
          </>
        )}
      </form>
    </Form>
  )
}
