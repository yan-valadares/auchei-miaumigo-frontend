import * as Dialog from '@radix-ui/react-dialog'
import { PencilLine, X } from 'lucide-react'
import Image from 'next/image'

import userTestImage from '@/assets/user-test.jpg'

type TutorInformationsProps = {
  isEditing: boolean
  setIsEditing: (value: boolean) => void
}

export default function TutorInformations({
  isEditing,
  setIsEditing,
}: TutorInformationsProps) {
  return (
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
              <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
                Alexandrina
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-blue-900">Último nome</label>
              <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
                Monteirodias
              </p>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-1 flex-col">
              <label className="text-blue-900">CPF</label>
              <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
                999.999.999-99
              </p>
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-blue-900">Telefone</label>
              <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
                (19) 99999-9999
              </p>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex-1">
              <label className="text-blue-900">Email</label>
              <p className="truncate rounded border border-gray-300 px-3 py-2 text-blue-900">
                alexandrina.monteirodias@email.com.br
              </p>
            </div>
            <div className="basis-2/8 flex flex-col">
              <label className="text-blue-900">CEP</label>
              <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
                99999-999
              </p>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-1 flex-col">
              <label className="text-blue-900">Logradouro</label>
              <p className="truncate rounded border border-gray-300 px-3 py-2 text-blue-900">
                Avenida Presidente Getúlio Vargas
              </p>
            </div>
            <div className="flex flex-shrink-0 basis-1/6 flex-col">
              <label className="text-blue-900">Número</label>
              <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
                9999
              </p>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="basis-1/8 flex flex-shrink-0 flex-col">
              <label className="text-blue-900">UF</label>
              <p className="truncate rounded border border-gray-300 px-3 py-2 text-blue-900">
                SP
              </p>
            </div>
            <div className="flex flex-1 flex-col truncate">
              <label className="text-blue-900">Cidade</label>
              <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
                São José do Vale do Rio Preto
              </p>
            </div>
            <div className="basis-3/8 flex flex-shrink-0 flex-col">
              <label className="text-blue-900">Cidade</label>
              <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
                Apartamento
              </p>
            </div>
          </div>
        </div>
        <button className="flex w-full items-center justify-center rounded-xl bg-red-500 py-2 text-xl font-semibold text-slate-100">
          Sair
        </button>
      </div>
    </Dialog.Content>
  )
}
