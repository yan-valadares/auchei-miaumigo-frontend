import Image from 'next/image'

export interface Ngo {
  id: number
  name: string
  email: string
  phone: string
  streetName: string
  state: string
  city: string
  number: number
  logo: string
}

export interface NgoProps {
  ngo: Ngo
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export default function NgoCard({ ngo }: NgoProps) {
  return (
    <div className="w-60 overflow-hidden rounded-xl border border-black">
      <Image
        src={ngo.logo}
        width={240}
        height={240}
        unoptimized
        alt="Imagem de um cachorro"
        className="h-32 w-full object-cover"
      />
      <div className="p-4 text-center">
        <div className="flex items-center justify-center gap-2 truncate text-lg">
          {ngo.name}
        </div>
        <p className="mt-2 text-orange-500">
          {capitalizeFirstLetter(ngo.city)}, {ngo.state}
        </p>
      </div>
    </div>
  )
}
