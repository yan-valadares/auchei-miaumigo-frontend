import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormItemWithSpacing } from '@/components/ui/form-item-with-spacing'
import {
  CepInputVariant,
  FileUploadInputVariant,
  InputVariant,
  NumberOnlyInputVariant,
  PhoneInputVariant,
} from '@/components/ui/input-variant'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-variant'
import LocationContext from '@/contexts/LocationContext'

interface TutorUpdateFormProps {
  setIsEditing: (value: boolean) => void
}

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB

const fileSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE
  }, 'Tamanho do arquivo menor que 3MB')

const ngoProfileSchema = z.object({
  ngoLogo: fileSchema,
  firstName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  lastName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  ngoName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  phone: z.string().min(10, { message: 'Mínimo 10 dígitos' }),
  cep: z
    .string()
    .min(8)
    .max(8, { message: '8 caracteres' })
    .refine((value) => /^\d+$/.test(value), { message: 'Apenas números' }),
  email: z.string().email({ message: 'Email inválido' }),
  streetName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  houseNumber: z.string().max(4).nullable(),
  state: z.string(),
  city: z.string(),
})

type NgoProfileFormData = z.infer<typeof ngoProfileSchema>

const initialNgoInformations: NgoProfileFormData = {
  firstName: '',
  lastName: '',
  ngoName: '',
  phone: '',
  email: '',
  cep: '',
  streetName: '',
  houseNumber: '',
  state: '',
  city: '',
  ngoLogo: undefined,
}

export default function NgoUpdateForm({ setIsEditing }: TutorUpdateFormProps) {
  const { cities, states, selectedState, setSelectedState } =
    useContext(LocationContext)

  const userPerfilForm = useForm<NgoProfileFormData>({
    resolver: zodResolver(ngoProfileSchema),
    defaultValues: initialNgoInformations,
  })

  function onSubmit(values: NgoProfileFormData) {
    console.log(values)
  }

  return (
    <Form {...userPerfilForm}>
      <form
        onSubmit={userPerfilForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex w-full items-center justify-center">
          <div className="flex h-28 w-48 justify-center overflow-hidden">
            <FormField
              control={userPerfilForm.control}
              name="ngoLogo"
              render={({ field }) => (
                <FormItemWithSpacing>
                  <FormControl>
                    <FileUploadInputVariant
                      onChange={(file) => field.onChange(file)}
                      name={field.name}
                      ref={field.ref}
                      className="w-36 rounded-none"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItemWithSpacing>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <div className="flex flex-1 flex-col">
              <FormField
                control={userPerfilForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItemWithSpacing labelSpacing="1">
                    <FormLabel className="text-base text-blue-900">
                      Nome do ADM
                    </FormLabel>
                    <FormControl>
                      <InputVariant
                        placeholder="Alexandrina"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItemWithSpacing>
                )}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <FormField
                control={userPerfilForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItemWithSpacing labelSpacing="1">
                    <FormLabel className="text-base text-blue-900">
                      Último nome do ADM
                    </FormLabel>
                    <FormControl>
                      <InputVariant
                        placeholder="Monteirodias"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItemWithSpacing>
                )}
              />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-1 flex-col">
              <FormField
                control={userPerfilForm.control}
                name="ngoName"
                render={({ field }) => (
                  <FormItemWithSpacing labelSpacing="1">
                    <FormLabel className="text-base text-blue-900">
                      Nome da ONG
                    </FormLabel>
                    <FormControl>
                      <InputVariant
                        placeholder="Cuidadogs"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItemWithSpacing>
                )}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <FormField
                control={userPerfilForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItemWithSpacing labelSpacing="1">
                    <FormLabel className="text-base text-blue-900">
                      Telefone
                    </FormLabel>
                    <FormControl>
                      <PhoneInputVariant
                        placeholder="(19) 99999-9999"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItemWithSpacing>
                )}
              />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-1 flex-col">
              <FormField
                control={userPerfilForm.control}
                name="streetName"
                render={({ field }) => (
                  <FormItemWithSpacing labelSpacing="1">
                    <FormLabel className="text-base text-blue-900">
                      Logradouro
                    </FormLabel>
                    <FormControl>
                      <InputVariant
                        placeholder="Avenida Presidente Getúlio Vargas"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItemWithSpacing>
                )}
              />
            </div>
            <div className="flex basis-1/6 flex-col">
              <FormField
                control={userPerfilForm.control}
                name="houseNumber"
                render={({ field }) => (
                  <FormItemWithSpacing labelSpacing="1">
                    <FormLabel className="text-base text-blue-900">
                      Número
                    </FormLabel>
                    <FormControl>
                      <NumberOnlyInputVariant
                        placeholder="9999"
                        {...field}
                        className="w-full"
                        maxLength={4}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItemWithSpacing>
                )}
              />
            </div>

            <div className="w-1/10 flex flex-col">
              <FormField
                name="state"
                render={({ field }) => (
                  <FormItemWithSpacing labelSpacing="1">
                    <FormLabel className="text-base text-blue-900">
                      UF
                    </FormLabel>
                    <Select
                      value={selectedState}
                      onValueChange={(value) => {
                        setSelectedState(value)
                        field.onChange(value)
                      }}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
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
                  </FormItemWithSpacing>
                )}
              />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-1 flex-col">
              <FormField
                name="city"
                render={({ field }) => (
                  <FormItemWithSpacing labelSpacing="1">
                    <FormLabel className="text-base text-blue-900">
                      Cidade
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!selectedState}
                      required
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma cidade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem
                            key={city.id}
                            value={city.nome.toString()}
                          >
                            {city.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItemWithSpacing>
                )}
              />
            </div>
            <div className="flex basis-1/4 flex-col">
              <FormField
                control={userPerfilForm.control}
                name="cep"
                render={({ field }) => (
                  <FormItemWithSpacing labelSpacing="1">
                    <FormLabel className="text-base text-blue-900">
                      CEP
                    </FormLabel>
                    <FormControl>
                      <CepInputVariant
                        placeholder="99999-999"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItemWithSpacing>
                )}
              />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-1 flex-col">
              <FormField
                control={userPerfilForm.control}
                name="email"
                render={({ field }) => (
                  <FormItemWithSpacing labelSpacing="1">
                    <FormLabel className="text-base text-blue-900">
                      Email
                    </FormLabel>
                    <FormControl>
                      <InputVariant
                        placeholder="alexandrina.monteirodias@email.com.br"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItemWithSpacing>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <button
            type="button"
            className="flex flex-1 items-center justify-center rounded-xl bg-red-500 py-2 text-xl font-semibold text-slate-100 hover:bg-red-600"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex flex-1 items-center justify-center rounded-xl bg-green-400 py-2 text-xl font-semibold text-slate-100 hover:bg-green-500"
          >
            Concluir
          </button>
        </div>
      </form>
    </Form>
  )
}
