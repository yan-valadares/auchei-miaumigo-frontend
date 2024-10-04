import Image from 'next/image'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'

import Tags, { type variants } from './Tags'

export interface Animal {
  id: number
  animalName: string
  gender: string
  weight: number
  age: string
  species: string
  size: string
  tags: (keyof typeof variants)[]
  ngo: string
  state: string
  city: string
  description: string
  imageUrl: string
}

export interface AnimalProps {
  animal: Animal
}

export default function AnimalCard({ animal }: AnimalProps) {
  return (
    <div className="h-fit w-72 overflow-hidden rounded-xl border border-black bg-white">
      <Image
        src={animal.imageUrl}
        width={240}
        height={240}
        unoptimized
        alt="Imagem de um cachorro"
        className="h-32 w-full border-b border-black object-cover"
      />
      <div className="space-y-2 px-4 py-2 text-center">
        <div className="mb-2 flex w-full justify-center gap-1">
          {animal.tags.map((tag) => (
            <Tags variant={tag} key={tag} />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 text-lg">
          {animal.animalName}
          {animal.gender === 'male' ? (
            <BsGenderMale className="mb-1 text-blue-500" size={24} />
          ) : (
            <BsGenderFemale className="mb-1 text-pink-300" size={24} />
          )}
        </div>
        <p className="mt-2 truncate text-orange-500">
          {animal.ngo}, {animal.city}, {animal.state}
        </p>
      </div>
    </div>
  )
}
