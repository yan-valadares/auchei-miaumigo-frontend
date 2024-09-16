import * as Dialog from '@radix-ui/react-dialog'
import { PencilLine, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { z } from 'zod'

import userTestImage from '@/assets/user-test.jpg'

import TutorInformations from './TutorInformations'

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB

const fileSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE
  }, 'Tamanho do arquivo menor que 3MB')

const userProfileSchema = z
  .object({
    avatar: fileSchema,
    firstName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
    lastName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
    cpf: z.string().min(11).max(11),
    phone: z.string().min(10, { message: 'Mínimo 10 dígitos' }),
    cep: z
      .string()
      .min(8)
      .max(8, { message: '8 caracteres' })
      .refine((value) => /^\d+$/.test(value), { message: 'Apenas números' }),
    email: z.string().email({ message: 'Email inválido' }),
    streetName: z.string().min(2, { message: 'Mínimo 2 caracteres' }),
    houseNumber: z.string().max(4).nullable(),
    houseType: z.enum(['house', 'apartment']),
    state: z.string(),
    city: z.string(),
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

type UserProfileForm = z.infer<typeof userProfileSchema>

export default function UserPerfilDialog() {
  const [isEditing, setIsEditing] = useState(false)

  const [profile, setProfile] = useState<UserProfileForm>({
    firstName: '',
    lastName: '',
    cpf: '',
    phone: '',
    email: '',
    cep: '',
    streetName: '',
    houseNumber: '',
    state: '',
    city: '',
    houseType: 'apartment',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile({
      ...profile,
      [name]: value,
    })
  }

  return isEditing ? (
    <Dialog.Content className="fixed left-1/2 top-1/2 w-dialog max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-6 py-4 text-gray-900 shadow">
      <Dialog.Title hidden>User Perfil</Dialog.Title>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <button onClick={() => setIsEditing(!isEditing)}>
            <PencilLine />
          </button>
          <Dialog.Close>
            <X />
          </Dialog.Close>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="flex h-28 w-28 overflow-hidden rounded-full">
            <Image
              src={userTestImage.src}
              alt="Imagem do perfil do usuário"
              width={144}
              height={144}
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <div className="flex flex-1 flex-col">
              <label className="text-blue-900">Nome</label>
              <p className="rounded border border-gray-300 p-2 text-blue-900">
                Alexandrina
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-blue-900">Último nome</label>
              <p className="rounded border border-gray-300 p-2 text-blue-900">
                Monteirodias
              </p>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-1 flex-col">
              <label className="text-blue-900">CPF</label>
              <p className="rounded border border-gray-300 p-2 text-blue-900">
                999.999.999-99
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-blue-900">Telefone</label>
              <p className="rounded border border-gray-300 p-2 text-blue-900">
                (19) 99999-9999
              </p>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex-1">
              <label className="text-blue-900">Email</label>
              <p className="truncate rounded border border-gray-300 p-2 text-blue-900">
                alexandrina.monteirodias@email.com.br
              </p>
            </div>
            <div className="basis-2/8 flex flex-col">
              <label className="text-blue-900">CEP</label>
              <p className="rounded border border-gray-300 p-2 text-blue-900">
                99999-999
              </p>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-1 flex-col">
              <label className="text-blue-900">Logradouro</label>
              <p className="truncate rounded border border-gray-300 p-2 text-blue-900">
                Avenida Presidente Getúlio Vargas
              </p>
            </div>
            <div className="flex flex-shrink-0 basis-1/6 flex-col">
              <label className="text-blue-900">Número</label>
              <p className="rounded border border-gray-300 p-2 text-blue-900">
                9999
              </p>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="basis-1/8 flex flex-shrink-0 flex-col">
              <label className="text-blue-900">UF</label>
              <p className="truncate rounded border border-gray-300 p-2 text-blue-900">
                SP
              </p>
            </div>
            <div className="flex flex-1 flex-col truncate">
              <label className="text-blue-900">Cidade</label>
              <p className="rounded border border-gray-300 p-2 text-blue-900">
                São José do Vale do Rio Preto
              </p>
            </div>
            <div className="basis-3/8 flex flex-shrink-0 flex-col">
              <label className="text-blue-900">Tipo</label>
              <p className="rounded border border-gray-300 p-2 text-blue-900">
                Apartamento
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-2">
          <button
            className="flex flex-1 items-center justify-center rounded-xl bg-red-500 py-2 text-xl font-semibold text-slate-100 hover:bg-red-600"
            onClick={() => setIsEditing(!isEditing)}
          >
            Cancelar
          </button>
          <button className="flex flex-1 items-center justify-center rounded-xl bg-green-400 py-2 text-xl font-semibold text-slate-100 hover:bg-green-500">
            Concluir
          </button>
        </div>
      </div>
    </Dialog.Content>
  ) : (
    <TutorInformations isEditing={isEditing} setIsEditing={setIsEditing} />
  )
}
