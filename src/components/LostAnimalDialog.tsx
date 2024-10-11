import * as Dialog from '@radix-ui/react-dialog'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'

import { serverDevAPI } from '@/lib/axios'

import type { LostAnimal } from './LostAnimalCard'

dayjs.locale(ptBR)

interface LostAnimalDialogProps {
  lostAnimalId: number
}

export default function LostAnimalDialog({
  lostAnimalId,
}: LostAnimalDialogProps) {
  const [lostAnimal, setLostAnimal] = useState<LostAnimal>()

  useEffect(() => {
    async function fetchAnimal() {
      try {
        const response = await serverDevAPI.get(`/lost-animals/${lostAnimalId}`)
        setLostAnimal(response.data)
      } catch (error) {
        console.error('Erro ao buscar informações do animal:', error)
      }
    }
    fetchAnimal()
  }, [lostAnimalId])

  if (!lostAnimal) {
    return
  }

  const formattedDate = dayjs(lostAnimal.lostDate).format(
    'DD [de] MMMM [de] YYYY',
  )

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 flex w-cardDialog -translate-x-1/2 -translate-y-1/2 rounded-md bg-white text-gray-900 shadow">
      <Dialog.Title hidden>Lost Animal</Dialog.Title>

      <div className="h-auto w-1/2 flex-shrink-0 overflow-hidden rounded-l-md">
        <div className="relative h-full w-full">
          <Image
            src={lostAnimal.imageUrl}
            alt="Imagem do perfil do usuário"
            layout="fill"
            objectFit="cover"
            className="rounded-l-md"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-end p-2">
          <Dialog.Close>
            <X />
          </Dialog.Close>
        </div>
        <div className="mb-4 flex h-full w-full flex-col space-y-4 pl-8 pr-8">
          <div className="flex w-full items-center justify-between">
            <p className="text-2xl">{lostAnimal.name}</p>
            {lostAnimal.sex === 'male' ? (
              <BsGenderMale size={24} className="text-blue-500" />
            ) : (
              <BsGenderFemale size={24} className="text-pink-300" />
            )}
          </div>

          <div className="flex items-center">
            <div className="flex-1">
              <label className="text-gray-500">Estado</label>
              <p className="text-lg text-black">{lostAnimal.state}</p>
            </div>
            <div className="flex-1">
              <label className="text-gray-500">Cidade</label>
              <p className="text-lg text-black">{lostAnimal.city}</p>
            </div>
          </div>

          <div className="flex-1">
            <label className="text-gray-500">Último local visto</label>
            <p className="text-lg text-black">{lostAnimal.lastPlaceSeen}</p>
          </div>

          <div className="flex-1">
            <label className="text-gray-500">Data de sumiço</label>
            <p className="text-lg text-black">{formattedDate}</p>
          </div>

          <div className="flex-1">
            <label className="text-gray-500">Email do tutor</label>
            <p className="text-lg text-black">{lostAnimal.tutorEmail}</p>
          </div>

          <button
            type="button"
            className="flex flex-1 items-center justify-center rounded-md bg-orange-500 py-2 text-xl font-semibold text-slate-100 hover:bg-red-600"
          >
            Achei seu amigo!
          </button>
        </div>
      </div>
    </Dialog.Content>
  )
}
