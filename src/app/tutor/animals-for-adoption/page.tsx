'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import AnimalCard, { type Animal } from '@/components/AnimalCard'
import { Pagination } from '@/components/Pagination'
import { serverDevAPI } from '@/lib/axios'

import TutorHeader from '../TutorHeader'
import AnimalFilters from './AnimalFilters'
import AnimalForAdoptionTutorViewDialog from './AnimalForAdoptionDialogTutorView'

export default function AnimalsForAdoption() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageIndex = Number(searchParams.get('page')) ?? 0
  const stateParams = searchParams.get('state') || ''
  const cityParams = searchParams.get('city') || ''
  const animalGenderParams = searchParams.get('gender') || ''
  const speciesParams = searchParams.get('species') || ''
  const ageGroupParams = searchParams.get('ageGroup') || ''
  const sizeParams = searchParams.get('size') || ''
  const ngoParams = searchParams.get('ngo') || ''

  useEffect(() => {
    async function fetchAnimals() {
      const response = await serverDevAPI.get(
        `/animals-for-adoption?_page=${pageIndex}&_per_page=12&state=${stateParams}&city=${cityParams}&gender=${animalGenderParams}&species=${speciesParams}&ageGroup=${ageGroupParams}&size=${sizeParams}&ngo=${ngoParams}`,
      )
      setAnimals(response.data)
    }
    fetchAnimals()
  }, [
    pageIndex,
    stateParams,
    cityParams,
    animalGenderParams,
    speciesParams,
    ageGroupParams,
    sizeParams,
    ngoParams,
  ])

  function handlePaginate(pageIndex: number) {
    router.push(`/tutor/animals-for-adoption?page=${pageIndex}&_per_page=12`)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <TutorHeader />
      <div className="flex w-full flex-1">
        <AnimalFilters />
        <div className="flex h-full w-full flex-col px-24 py-12">
          <div className="mb-4 grid flex-1 grid-cols-4 items-start justify-start gap-8">
            {animals.map((animal) => (
              <Dialog.Root key={animal.id}>
                <Dialog.Trigger className="h-fit w-fit">
                  <AnimalCard animal={animal} />
                </Dialog.Trigger>

                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/70" />
                  <AnimalForAdoptionTutorViewDialog animalId={animal.id} />
                </Dialog.Portal>
              </Dialog.Root>
            ))}
          </div>
          <div className="flex w-full items-center justify-end px-6">
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={pageIndex}
              totalCount={12}
              perPage={12}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
