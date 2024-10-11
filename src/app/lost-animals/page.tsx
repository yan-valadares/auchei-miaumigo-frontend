'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import LostAnimalCard, { type LostAnimal } from '@/components/LostAnimalCard'
import LostAnimalDialog from '@/components/LostAnimalDialog'
import { Pagination } from '@/components/Pagination'
import { serverDevAPI } from '@/lib/axios'

import TutorHeader from '../tutor/TutorHeader'
import { LostAnimalsFilters } from './LostAnimalsFilters'

export default function LostAnimals() {
  const [lostAnimals, setLostAnimals] = useState<LostAnimal[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageIndex = Number(searchParams.get('page')) ?? 0
  const stateParams = searchParams.get('state') || ''
  const cityParams = searchParams.get('city') || ''

  useEffect(() => {
    async function fetchAnimals() {
      const response = await serverDevAPI.get(
        `/lost-animals?_page=${pageIndex}&_per_page=12&state=${stateParams}&city=${cityParams}`,
      )
      setLostAnimals(response.data)
    }
    fetchAnimals()
  }, [pageIndex, stateParams, cityParams])

  function handlePaginate() {
    router.push(`/lost-animals?page=0&_per_page=12`)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <TutorHeader />
      <div className="mt-3 flex h-full w-app flex-col items-center gap-2 px-32">
        <div className="mb-2 flex w-full items-start text-4xl font-semibold text-purple-500">
          Ajude as pessoas a acharem seu amigos perdidos!
        </div>
        <LostAnimalsFilters />
        <div className="flex w-full flex-1 flex-wrap items-start gap-8">
          {lostAnimals.map((lostAnimal) => (
            <Dialog.Root key={lostAnimal.id}>
              <Dialog.Trigger className="h-fit w-fit">
                <LostAnimalCard key={lostAnimal.id} lostAnimal={lostAnimal} />
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/70" />
                <LostAnimalDialog lostAnimalId={lostAnimal.id} />
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
