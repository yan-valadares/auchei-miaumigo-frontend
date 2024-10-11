import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
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
  weight: z.string(),
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
    console.log(tags)
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
                <div className="mt-1 flex items-center gap-2">
                  {tags.map((tag) => (
                    <button onClick={() => removeTag(tag)} key={tag}>
                      <Tags variant={tag} />
                    </button>
                  ))}

                  {tags.length < 3 && (
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button
                          type="button"
                          className="rounded-md bg-blue-500 p-1.5 text-white transition-colors duration-300 hover:bg-blue-600"
                        >
                          <Plus size={20} />
                        </button>
                      </DropdownMenu.Trigger>

                      <DropdownMenu.Portal>
                        <DropdownMenu.Content
                          className="w-48 rounded-md bg-white p-2 shadow-lg transition-transform duration-300 ease-in-out"
                          sideOffset={5}
                        >
                          <DropdownMenu.Item asChild>
                            <button
                              type="button"
                              onClick={() => addTag('playful')}
                              className="block w-full rounded-md px-4 py-2 text-left text-sm transition-colors hover:bg-blue-100"
                            >
                              Brincalhão
                            </button>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <button
                              type="button"
                              onClick={() => addTag('calm')}
                              className="block w-full rounded-md px-4 py-2 text-left text-sm transition-colors hover:bg-blue-100"
                            >
                              Calmo
                            </button>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <button
                              type="button"
                              onClick={() => addTag('care')}
                              className="block w-full rounded-md px-4 py-2 text-left text-sm transition-colors hover:bg-blue-100"
                            >
                              Carinhoso
                            </button>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <button
                              type="button"
                              onClick={() => addTag('docile')}
                              className="block w-full rounded-md px-4 py-2 text-left text-sm transition-colors hover:bg-blue-100"
                            >
                              Dócil
                            </button>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <button
                              type="button"
                              onClick={() => addTag('energetic')}
                              className="block w-full rounded-md px-4 py-2 text-left text-sm transition-colors hover:bg-blue-100"
                            >
                              Energético
                            </button>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <button
                              type="button"
                              onClick={() => addTag('independent')}
                              className="block w-full rounded-md px-4 py-2 text-left text-sm transition-colors hover:bg-blue-100"
                            >
                              Independete
                            </button>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <button
                              type="button"
                              onClick={() => addTag('protector')}
                              className="block w-full rounded-md px-4 py-2 text-left text-sm transition-colors hover:bg-blue-100"
                            >
                              Protetor
                            </button>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item asChild>
                            <button
                              type="button"
                              onClick={() => addTag('selective')}
                              className="block w-full rounded-md px-4 py-2 text-left text-sm transition-colors hover:bg-blue-100"
                            >
                              Seletivo
                            </button>
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            asChild
                            onSelect={() => addTag('sociable')}
                          >
                            <button
                              className="block w-full rounded-md px-4 py-2 text-left text-sm transition-colors hover:bg-blue-100"
                              type="button"
                              onClick={() => addTag('sociable')}
                            >
                              Sociável
                            </button>
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Root>
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
                  type="submit"
                  className="flex flex-1 items-center justify-center rounded-md bg-green-500 py-2 text-xl font-semibold text-slate-100 hover:bg-green-600"
                >
                  Adicionar animal
                </button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </Dialog.Content>
  )
}
