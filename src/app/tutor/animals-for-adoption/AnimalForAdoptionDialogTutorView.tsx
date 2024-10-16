import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'

import type { Animal } from '@/components/AnimalCard'
import { serverDevAPI } from '@/lib/axios'

interface AnimalForAdoptionTutorViewDialogProps {
  animalId: number
}

export default function AnimalForAdoptionTutorViewDialog({
  animalId,
}: AnimalForAdoptionTutorViewDialogProps) {
  const [animal, setAnimal] = useState<Animal>()

  useEffect(() => {
    async function fetchAnimal() {
      try {
        const response = await serverDevAPI.get(
          `/animals-for-adoption/${animalId}`,
        )
        setAnimal(response.data)
      } catch (error) {
        console.error('Erro ao buscar informações do animal:', error)
      }
    }
    fetchAnimal()
  }, [animalId])

  if (!animal) {
    return
  }

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 flex w-cardDialog -translate-x-1/2 -translate-y-1/2 rounded-md bg-white text-gray-900 shadow">
      <Dialog.Title hidden>Animal for adoption</Dialog.Title>

      <div className="h-auto w-1/2 flex-shrink-0 overflow-hidden rounded-l-md">
        <div className="relative h-full w-full">
          {animal?.imageUrl ? (
            <Image
              src={animal.imageUrl}
              alt="Imagem do perfil do usuário"
              layout="fill"
              objectFit="cover"
              className="rounded-l-md"
            />
          ) : (
            <p>Imagem indisponível</p>
          )}
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
            <p className="text-2xl">{animal.animalName}</p>
            {animal.sex === 'male' ? (
              <BsGenderMale size={24} className="text-blue-500" />
            ) : (
              <BsGenderFemale size={24} className="text-pink-300" />
            )}
          </div>

          <div className="flex items-center">
            <div className="flex-1">
              <label className="text-gray-500">Peso</label>
              <p className="text-lg text-black">{animal.weight} kg</p>
            </div>
            <div className="flex-1">
              <label className="text-gray-500">Idade aproximada</label>
              <p className="text-lg text-black">{animal.age}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-gray-500">Espécie</label>
              <p className="text-lg text-black">
                {animal.species === 'dog' ? 'Cachorro' : 'Gato'}
              </p>
            </div>
            <div className="flex-1">
              <label className="text-gray-500">Porte</label>
              <p className="text-lg text-black">
                {animal.size === 'small'
                  ? 'Pequeno'
                  : animal.size === 'medium'
                    ? 'Médio'
                    : 'Grande'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-gray-500">ONG</label>
              <p className="text-lg text-black">{animal.ngo}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-gray-500">Estado</label>
              <p className="text-lg text-black">{animal.state}</p>
            </div>
            <div className="flex-1">
              <label className="text-gray-500">Cidade</label>
              <p className="truncate text-lg text-black">{animal.city}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-gray-500">Descrição</label>
              <p className="text-lg text-black">{animal.description}</p>
            </div>
          </div>
          <button
            type="button"
            className="flex flex-1 items-center justify-center rounded-md bg-orange-500 py-2 text-xl font-semibold text-slate-100 hover:bg-orange-600"
          >
            Achei meu amigo!
          </button>
        </div>
      </div>
    </Dialog.Content>
  )
}
