import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { serverDevAPI } from '@/lib/axios'

import type { LostAnimalProps } from './LostAnimalCard'
import LostAnimalCard from './LostAnimalCard'

export default function LostAnimalsCarousel() {
  const [animals, setAnimals] = useState<LostAnimalProps[]>([])

  useEffect(() => {
    async function fetchAnimals() {
      const response = await serverDevAPI.get(`/lost-animals?_page=0`)
      setAnimals(response.data)
    }
    fetchAnimals()
  }, [])

  console.log(animals)

  return animals.length > 0 ? (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="mt-4 w-full pl-4"
    >
      <CarouselContent>
        {animals.map((animalList) => (
          <CarouselItem key={animalList.lostAnimal.id} className="basis-1/4">
            <LostAnimalCard lostAnimal={animalList.lostAnimal} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="h-10 w-10 rounded-lg bg-orange-500" />
      <CarouselNext className="h-10 w-10 rounded-lg bg-orange-500" />
    </Carousel>
  ) : (
    <div>
      <p>carregando</p>
    </div>
  )
}
