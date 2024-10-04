import Image from 'next/image'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'

import Tags from './Tags'

export interface Animal {
  id: number
  animalName: string
  gender: string
  weight: number
  age: string
  species: string
  size: string
  tags: string[]
  ngo: string
  state: string
  city: string
  description: string
  imageUrl: string
}

export interface AnimalProps {
  animal: Animal
}

export default function AnimalCard() {
  return (
    <div className="h-fit w-72 overflow-hidden rounded-xl border border-black bg-white">
      <Image
        src={
          'https://plus.unsplash.com/premium_photo-1677545183884-421157b2da02?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        width={240}
        height={240}
        unoptimized
        alt="Imagem de um cachorro"
        className="h-32 w-full object-cover"
      />
      <div className="space-y-2 px-4 py-2 text-center">
        <div className="mb-2 flex w-full justify-center gap-1">
          <Tags variant="energetic" />
          <Tags variant="independent" />
          <Tags variant="selective" />
        </div>
        <div className="flex items-center justify-center gap-2 text-lg">
          Jorge
          {/* {lostAnimal.gender === 'male' ? (
            <BsGenderMale className="mb-1 text-blue-500" size={24} />
          ) : (
            <BsGenderFemale className="mb-1 text-pink-300" size={24} />
          )} */}
          <BsGenderMale className="mb-1 text-blue-500" size={24} />
        </div>
        <p className="mt-2 truncate text-orange-500">
          Cuidadogs, São Paulo, SP
        </p>
      </div>
    </div>
  )
}
