'use client'

import TutorHeader from '../TutorHeader'
import AnimalFilters from './AnimalFilters'

export default function AnimalsForAdoption() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <TutorHeader />
      <div className="flex w-full flex-1 bg-slate-200">
        <AnimalFilters />
        <div className="h-full w-full bg-green-300">B</div>
      </div>
    </div>
  )
}
