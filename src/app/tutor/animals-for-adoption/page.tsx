'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import AnimalCard, { type Animal } from '@/components/AnimalCard'
import { Pagination } from '@/components/Pagination'
import { serverDevAPI } from '@/lib/axios'

import TutorHeader from '../TutorHeader'
import AnimalFilters from './AnimalFilters'

export default function AnimalsForAdoption() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageIndex = Number(searchParams.get('page')) ?? 0
  const stateParams = searchParams.get('state') || ''
  const cityParams = searchParams.get('city') || ''

  useEffect(() => {
    async function fetchAnimals() {
      const response = await serverDevAPI.get(
        `/animals-for-adoption?_page=${pageIndex}&_per_page=12&state=${stateParams}&city=${cityParams}`,
      )
      setAnimals(response.data)
    }
    fetchAnimals()
  }, [pageIndex, stateParams, cityParams])

  function handlePaginate(pageIndex: number) {
    router.push(`/tutor/animals-for-adoption?page=${pageIndex}&_per_page=12`)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <TutorHeader />
      <div className="flex w-full flex-1">
        <AnimalFilters />
        <div className="flex h-full w-full flex-col px-24 py-12">
          <div className="mb-4 flex flex-1 flex-wrap justify-end gap-8">
            {animals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
          <div className="flex w-full items-center justify-end">
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
