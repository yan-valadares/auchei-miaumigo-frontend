export interface Animal {
  id: number
  name: string
  lastPlaceSeen: string
  lostDate: Date
  city: string
  state: string
  gender: 'male' | 'female'
  imageUrl: string
}

export interface AnimalProps {
  animal: Animal
}

export default function LostAnimalCard() {
  return <></>
}
