import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { serverDevAPI } from '@/lib/axios'

import LostAnimalCard, { type LostAnimalProps } from './LostAnimalCard'

export default function LostAnimalsCarousel() {
  const [animals, setAnimals] = useState<LostAnimalProps[]>([])

  useEffect(() => {
    async function fetchAnimals() {
      const response = await serverDevAPI.get(`/lost-animals?_page=0`)
      setAnimals(response.data)
    }
    fetchAnimals()
  }, [])

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="mt-4 w-full pl-4"
    >
      <CarouselContent>
        {animals.map((animal) => (
          <CarouselItem key={animal.id} className="basis-1/4">
            <LostAnimalCard
              id={animal.id}
              name={animal.name}
              lastPlaceSeen={animal.lastPlaceSeen}
              lostDate={animal.lostDate}
              city={animal.city}
              gender={animal.gender}
              state={animal.state}
              imageUrl={animal.imageUrl}
            />
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
