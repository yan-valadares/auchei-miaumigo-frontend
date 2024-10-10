import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Tags, { type variants } from '@/components/Tags'
import { ImageUploadInput } from '@/components/ui/file-input'
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormItemWithSpacing } from '@/components/ui/form-item-with-spacing'
import {
  InputVariant,
  NumberOnlyInputVariant,
  TextareaInputVariant,
} from '@/components/ui/input-variant'
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

const createAnimalFormSchema = z.object({
  imageUrl: fileSchema,
  animalName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
  animalSex: z.enum(['male', 'female']),
  weight: z.number().max(25, { message: 'Peso máximo 25kg' }),
  age: z.string().min(6),
  species: z.enum(['dog', 'cat']),
  size: z.enum(['small', 'medium', 'large']),
  description: z
    .string()
    .min(4, { message: 'Descreva o animal' })
    .max(250, { message: '250 caracteres max' }),
})

type CreateAnimalFormData = z.infer<typeof createAnimalFormSchema>

export default function CreateAnimalDialog() {
  const [tags, setTags] = useState<(keyof typeof variants)[]>([])

  const createAnimalForm = useForm<CreateAnimalFormData>({
    resolver: zodResolver(createAnimalFormSchema),
  })

  function addTag(tag: keyof typeof variants) {
    if (tags.length < 3 && !tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  function removeTag(tagToRemove: keyof typeof variants) {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  function onSubmit(values: CreateAnimalFormData) {
    console.log(values)
  }

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 flex w-cardDialog -translate-x-1/2 -translate-y-1/2 rounded-md bg-white text-gray-900 shadow">
      <Dialog.Title hidden>Animal for adoption</Dialog.Title>
      <Form {...createAnimalForm}>
        <form
          onSubmit={createAnimalForm.handleSubmit(onSubmit)}
          className="flex w-full"
        >
          <div className="h-auto w-1/2 flex-shrink-0 overflow-hidden rounded-l-md">
            <div className="relative flex h-full w-full items-center justify-center border-r border-slate-200">
              <FormField
                control={createAnimalForm.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItemWithSpacing>
                    <FormControl>
                      <ImageUploadInput
                        onChange={(file) => field.onChange(file)}
                        name={field.name}
                        ref={field.ref}
                        className="h-full w-full object-cover"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItemWithSpacing>
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
                    control={createAnimalForm.control}
                    name="animalName"
                    render={({ field }) => (
                      <FormItemWithSpacing labelSpacing="1">
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
                      </FormItemWithSpacing>
                    )}
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <FormField
                    control={createAnimalForm.control}
                    name="animalSex"
                    render={({ field }) => (
                      <FormItemWithSpacing labelSpacing="1">
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
                      </FormItemWithSpacing>
                    )}
                  />
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-1 flex-col">
                  <FormField
                    control={createAnimalForm.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItemWithSpacing labelSpacing="1">
                        <FormLabel className="text-base text-blue-900">
                          Peso
                        </FormLabel>
                        <FormControl>
                          <NumberOnlyInputVariant
                            placeholder="Peso em quilos"
                            {...field}
                            className="w-full"
                            maxLength={2}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItemWithSpacing>
                    )}
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <FormField
                    control={createAnimalForm.control}
                    name="age"
                    render={({ field }) => (
                      <FormItemWithSpacing labelSpacing="1">
                        <FormLabel className="text-base text-blue-900">
                          Idade aproximada
                        </FormLabel>
                        <FormControl>
                          <InputVariant
                            placeholder="6 meses"
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
                    control={createAnimalForm.control}
                    name="species"
                    render={({ field }) => (
                      <FormItemWithSpacing labelSpacing="1">
                        <FormLabel className="text-base text-blue-900">
                          Espécie
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} required>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Espécie do animal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dog">Cachorro</SelectItem>
                              <SelectItem value="cat">Gato</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItemWithSpacing>
                    )}
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <FormField
                    control={createAnimalForm.control}
                    name="size"
                    render={({ field }) => (
                      <FormItemWithSpacing labelSpacing="1">
                        <FormLabel className="text-base text-blue-900">
                          Porte
                        </FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} required>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Porte do animal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="small">Pequeno</SelectItem>
                              <SelectItem value="medium">Médio</SelectItem>
                              <SelectItem value="large">Grande</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItemWithSpacing>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-500">Tags</label>
                <div className="mt-1 flex items-center gap-4">
                  {tags.map((tag) => (
                    <button onClick={() => removeTag(tag)} key={tag}>
                      <Tags variant={tag} />
                    </button>
                  ))}

                  {tags.length < 3 && (
                    <button
                      type="button"
                      className="rounded-md bg-blue-500 p-1 text-white hover:bg-blue-500"
                      onClick={() => addTag('novaTag' as keyof typeof variants)}
                    >
                      <Plus size={18} />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                <FormField
                  control={createAnimalForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItemWithSpacing labelSpacing="1">
                      <FormLabel className="text-base text-blue-900">
                        Descrição
                      </FormLabel>
                      <FormControl>
                        <TextareaInputVariant
                          {...field}
                          className="h-32 w-full"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItemWithSpacing>
                  )}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center rounded-md bg-red-500 py-2 text-xl font-semibold text-slate-100 hover:bg-red-600"
                >
                  Excluir
                </button>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center rounded-md bg-blue-800 py-2 text-xl font-semibold text-slate-100 hover:bg-blue-600"
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </Dialog.Content>
  )
}
