'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Plus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import AnimalCard, { type Animal } from '@/components/AnimalCard'
import { Pagination } from '@/components/Pagination'
import { serverDevAPI } from '@/lib/axios'

import NGOHeader from '../NGOHeader'
import AnimalForAdoptionNgoViewDialog from './AnimalForAdoptionDialogNgoView'
import { AnimalsFilters } from './AnimalsFilters'
import CreateAnimalDialog from './CreateAnimalDialog'

export default function LostAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageIndex = Number(searchParams.get('page')) ?? 0
  const sizeParams = searchParams.get('size') || ''
  const animalSexParams = searchParams.get('sex') || ''
  const speciesParams = searchParams.get('species') || ''
  const animalNameParams = searchParams.get('animalName') || ''

  useEffect(() => {
    async function fetchAnimals() {
      const response = await serverDevAPI.get(
        `animals?_page=${pageIndex}&_per_page=12&sex=${animalSexParams}&species=${speciesParams}&size=${sizeParams}&animalName=${animalNameParams}`,
      )
      setAnimals(response.data)
    }
    fetchAnimals()
  }, [pageIndex, sizeParams, animalSexParams, speciesParams, animalNameParams])

  function handlePaginate() {
    router.push(`/ngo/animals?page=0&_per_page=12`)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <NGOHeader />
      <div className="mt-3 flex h-full w-app flex-col items-center gap-6 px-32">
        <div className="flex w-full gap-16">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="flex w-16 flex-1 items-center justify-center gap-2 rounded-md border border-purple-800 bg-purple-500 px-3 text-white hover:bg-purple-600"
              >
                Adicionar animal
                <Plus size={24} />
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/70" />
              <CreateAnimalDialog />
            </Dialog.Portal>
          </Dialog.Root>
          <AnimalsFilters />
        </div>
        <div className="flex w-full flex-1 flex-wrap items-start justify-between gap-4">
          {animals.map((animal) => (
            <Dialog.Root key={animal.id}>
              <Dialog.Trigger className="h-fit w-fit">
                <AnimalCard animal={animal} />
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/70" />
                <AnimalForAdoptionNgoViewDialog animalId={animal.id} />
              </Dialog.Portal>
            </Dialog.Root>
          ))}
        </div>
        <div className="mb-3 flex w-full items-center justify-end">
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={pageIndex}
            totalCount={12}
            perPage={12}
          />
        </div>
      </div>
    </div>
  )
}
