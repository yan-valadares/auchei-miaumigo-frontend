import Image from 'next/image'
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'

export interface LostAnimalProps {
  id: number
  name: string
  lastPlaceSeen: string
  lostDate: Date
  city: string
  state: string
  gender: 'male' | 'female'
  imageUrl: string
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export default function LostAnimalCard({
  name,
  gender,
  city,
  state,
  imageUrl,
}: LostAnimalProps) {
  return (
    <div className="w-60 overflow-hidden rounded-xl border border-black">
      <Image
        src={imageUrl}
        width={240}
        height={240}
        unoptimized
        alt="Imagem de um cachorro"
        className="h-32 w-full object-cover"
      />
      <div className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-lg">
          {name}
          {gender === 'male' ? (
            <BsGenderMale className="mb-1 text-blue-500" size={24} />
          ) : (
            <BsGenderFemale className="mb-1 text-pink-300" size={24} />
          )}
        </div>
        <p className="mt-2 text-orange-500">
          {capitalizeFirstLetter(city)}, {state}
        </p>
      </div>
    </div>
  )
}
