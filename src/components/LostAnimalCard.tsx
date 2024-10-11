import Image from 'next/image'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'

export interface LostAnimal {
  id: number
  name: string
  lastPlaceSeen: string
  lostDate: Date
  city: string
  state: string
  sex: 'male' | 'female'
  imageUrl: string
  tutorEmail: string
}

export interface LostAnimalProps {
  lostAnimal: LostAnimal
}

export default function LostAnimalCard({ lostAnimal }: LostAnimalProps) {
  return (
    <div className="w-60 overflow-hidden rounded-xl border border-black bg-white">
      <Image
        src={lostAnimal.imageUrl}
        width={240}
        height={240}
        unoptimized
        alt="Imagem de um cachorro"
        className="h-32 w-full border-b border-black object-cover"
      />
      <div className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-lg">
          {lostAnimal.name}
          {lostAnimal.sex === 'male' ? (
            <BsGenderMale className="mb-1 text-blue-500" size={24} />
          ) : (
            <BsGenderFemale className="mb-1 text-pink-300" size={24} />
          )}
        </div>
        <p className="mt-2 text-orange-500">
          {lostAnimal.city}, {lostAnimal.state}
        </p>
      </div>
    </div>
  )
}
