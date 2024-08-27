import { MoveLeft } from 'lucide-react'
import { useContext } from 'react'
import type { Control } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { CepInput } from '@/components/ui/cep-input'
import { ImageUploadInput } from '@/components/ui/file-input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { NumberOnlyInput } from '@/components/ui/number-only-input'
import { PhoneInput } from '@/components/ui/phone-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import LocationContext from '@/contexts/LocationContext'

import { SignUpTutorFormData } from './SignUpTutorForm'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB

const fileSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE
  }, 'Tamanho do arquivo menor que 3MB')

export const secondPageTutorFormSchema = z.object({
  phone: z.string().min(10, { message: 'Mínimo 10 dígitos' }),
  cep: z
    .string()
    .min(8)
    .max(8, { message: '8 caracteres' })
    .refine((value) => /^\d+$/.test(value), { message: 'Apenas números' }),
  streetName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  houseNumber: z.string().max(4).nullable(),
  houseType: z.enum(['house', 'apartment']),
  state: z.string(),
  city: z.string(),
  avatar: fileSchema,
})

interface SecondPageTutorFormProps {
  control: Control<SignUpTutorFormData>
  handlePreviousPage: () => void
}

export function SecondPageTutorForm({
  control,
  handlePreviousPage,
}: SecondPageTutorFormProps) {
  const { cities, states, selectedState, setSelectedState } =
    useContext(LocationContext)

  return (
    <>
      <FormField
        control={control}
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
        control={control}
        name="cep"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-semibold text-darkBlue">
              CEP
            </FormLabel>
            <FormControl>
              <CepInput placeholder="XXXXX-XXX" {...field}/>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={control}
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
      <div className="flex w-full items-end gap-2">
        <FormField
          control={control}
          name="houseNumber"
          render={({ field }) => (
            <FormItem className="w-1/4 sm:w-1/3">
              <FormLabel className="text-xl font-semibold text-darkBlue">
                Número
              </FormLabel>
              <FormControl>
                <NumberOnlyInput {...field} placeholder="XXXX" maxLength={4} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="houseType"
          render={({ field }) => (
            <FormItem className="w-3/4">
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
      <div className="flex w-full items-center justify-between gap-2">
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
                    <SelectItem key={city.id} value={city.nome.toString()}>
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
        control={control}
        name="avatar"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-semibold text-darkBlue">
              Foto
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
  )
}
