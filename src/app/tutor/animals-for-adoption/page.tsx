'use client'

import AnimalCard from '@/components/AnimalCard'
import { Pagination } from '@/components/Pagination'

import TutorHeader from '../TutorHeader'
import AnimalFilters from './AnimalFilters'

export default function AnimalsForAdoption() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <TutorHeader />
      <div className="flex w-full flex-1">
        <AnimalFilters />
        <div className="flex h-full w-full flex-col px-24 py-12">
          <div className="mb-4 flex flex-1 flex-wrap justify-end gap-8">
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
            <AnimalCard />
          </div>
          <div className="flex w-full items-center justify-end">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  )
}
