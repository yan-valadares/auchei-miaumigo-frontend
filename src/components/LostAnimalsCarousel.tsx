import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import LostAnimalCard, { type LostAnimalProps } from './LostAnimalCard'

const animals: LostAnimalProps[] = [
  {
    id: 1,
    name: 'Felipe',
    city: 'Campinas',
    state: 'São Paulo',
    gender: 'male',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Luna',
    city: 'Copacabana',
    state: 'Rio de Janeiro',
    gender: 'female',
    imageUrl:
      'https://images.unsplash.com/photo-1452441271666-5d998aa2f6cc?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Simba',
    city: 'Belo Horizonte',
    state: 'Minas Gerais',
    gender: 'male',
    imageUrl:
      'https://images.unsplash.com/photo-1472491235688-bdc81a63246e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    name: 'Nala',
    city: 'Salvador',
    state: 'Bahia',
    gender: 'female',
    imageUrl:
      'https://images.unsplash.com/photo-1511044568932-338cba0ad803?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: 'Max',
    city: 'Fortaleza',
    state: 'Ceará',
    gender: 'male',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1667673941713-ad4d4751c93b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    name: 'Mia',
    city: 'Brasília',
    state: 'Distrito Federal',
    gender: 'female',
    imageUrl:
      'https://images.unsplash.com/photo-1422565096762-bdb997a56a84?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    name: 'Leo',
    city: 'Curitiba',
    state: 'Paraná',
    gender: 'male',
    imageUrl:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1443&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    name: 'Bella',
    city: 'Manaus',
    state: 'Amazonas',
    gender: 'female',
    imageUrl:
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
]

export default function LostAnimalsCarousel() {
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
  )
}
