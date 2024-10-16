import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ImageUploadInput } from '@/components/ui/file-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { DateInputVariant, InputVariant } from '@/components/ui/input-variant'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-variant'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB

const fileSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE
  }, 'Tamanho do arquivo menor que 3MB')

const createLostAnimalFormSchema = z.object({
  imageUrl: fileSchema,
  animalName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  animalSex: z.enum(['male', 'female']),
  lastPlaceSeen: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  lostDate: z.string(),
})

type CreateLostAnimalFormData = z.infer<typeof createLostAnimalFormSchema>

export default function CreateLostAnimalDialog() {
  const createLostAnimalForm = useForm<CreateLostAnimalFormData>({
    resolver: zodResolver(createLostAnimalFormSchema),
  })

  function onSubmit(values: CreateLostAnimalFormData) {
    console.log(values)
  }

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 flex w-cardDialog -translate-x-1/2 -translate-y-1/2 rounded-md bg-white text-gray-900 shadow">
      <Dialog.Title hidden>Animal for adoption</Dialog.Title>
      <Form {...createLostAnimalForm}>
        <form
          onSubmit={createLostAnimalForm.handleSubmit(onSubmit)}
          className="flex w-full"
        >
          <div className="h-auto w-1/2 flex-shrink-0 overflow-hidden rounded-l-md">
            <div className="relative flex h-full w-full items-center justify-center border-r border-slate-200">
              <FormField
                control={createLostAnimalForm.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploadInput
                        onChange={(file) => field.onChange(file)}
                        name={field.name}
                        ref={field.ref}
                        className="h-full w-full object-cover"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex w-full flex-col">
            <div className="flex items-center justify-end p-2">
              <Dialog.Close>
                <X />
              </Dialog.Close>
            </div>
            <div className="mb-4 flex h-full w-full flex-col space-y-4 pl-8 pr-8">
              <div className="flex w-full gap-4">
                <div className="flex flex-1 flex-col">
                  <FormField
                    control={createLostAnimalForm.control}
                    name="animalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-blue-900">
                          Nome do animal
                        </FormLabel>
                        <FormControl>
                          <InputVariant
                            placeholder="Paçoca"
                            {...field}
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <FormField
                    control={createLostAnimalForm.control}
                    name="animalSex"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base text-blue-900">
                          Sexo do animal
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} required>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sexo do animal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Macho</SelectItem>
                              <SelectItem value="female">Fêmea</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                <FormField
                  control={createLostAnimalForm.control}
                  name="lastPlaceSeen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-blue-900">
                        Local em que o animal desapareceu
                      </FormLabel>
                      <FormControl>
                        <InputVariant
                          placeholder="Praça da amizade"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-1 flex-col">
                <FormField
                  control={createLostAnimalForm.control}
                  name="lostDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-blue-900">
                        Data de sumiço do animal
                      </FormLabel>
                      <FormControl>
                        <DateInputVariant
                          placeholder="Praça da amizade"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center rounded-md bg-green-500 py-2 text-xl font-semibold text-slate-100 hover:bg-green-600"
                >
                  Confirmar sumiço
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </Dialog.Content>
  )
}
