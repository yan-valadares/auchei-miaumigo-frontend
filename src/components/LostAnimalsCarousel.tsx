import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { serverDevAPI } from '@/lib/axios'

import type { LostAnimal } from './LostAnimalCard'
import LostAnimalCard from './LostAnimalCard'
import LostAnimalDialog from './LostAnimalDialog'

export default function LostAnimalsCarousel() {
  const [lostAnimals, setLostAnimals] = useState<LostAnimal[]>([])

  useEffect(() => {
    async function fetchAnimals() {
      const response = await serverDevAPI.get(`/lost-animals?_page=0`)
      setLostAnimals(response.data)
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
        {lostAnimals.map((lostAnimal) => (
          <CarouselItem key={lostAnimal.id} className="basis-1/4">
            <Dialog.Root key={lostAnimal.id}>
              <Dialog.Trigger className="h-fit w-fit">
                <LostAnimalCard key={lostAnimal.id} lostAnimal={lostAnimal} />
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/70" />
                <LostAnimalDialog lostAnimalId={lostAnimal.id} />
              </Dialog.Portal>
            </Dialog.Root>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="h-10 w-10 rounded-lg bg-orange-500" />
      <CarouselNext className="h-10 w-10 rounded-lg bg-orange-500" />
    </Carousel>
  )
}
