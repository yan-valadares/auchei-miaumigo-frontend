import Image from 'next/image'
import { useEffect, useState } from 'react'

import { cepFormatter, phoneFormatter } from '@/app/utils/formatter'
import { serverDevAPI } from '@/lib/axios'

import type { Ngo } from './NgoCard'

interface NgoInformationsTutorViewProps {
  ngoId: string
}

export default function NgoInformationsTutorView({
  ngoId,
}: NgoInformationsTutorViewProps) {
  const [ngo, setNgo] = useState<Ngo>()

  useEffect(() => {
    async function fetchNgo() {
      const response = await serverDevAPI.get(`/ngos/${ngoId}`)
      setNgo(response.data)

      console.log(response.data)
    }

    fetchNgo()
  }, [ngoId])

  if (!ngo) {
    return
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full items-center justify-center">
        <div className="flex h-28 justify-center overflow-hidden">
          <Image
            src={ngo.logo}
            alt="Imagem do perfil da ONG"
            width={144}
            height={144}
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex w-full gap-4">
          <div className="flex flex-1 flex-col">
            <label className="text-blue-900">Nome da ONG</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {ngo.ngoName}
            </p>
          </div>
          <div className="flex flex-1 flex-col">
            <label className="text-blue-900">Telefone</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {phoneFormatter(ngo.phone)}
            </p>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-1 flex-col">
            <label className="text-blue-900">Logradouro</label>
            <p className="truncate rounded border border-gray-300 px-3 py-2 text-blue-900">
              {ngo.streetname}
            </p>
          </div>
          <div className="flex flex-shrink-0 basis-1/6 flex-col">
            <label className="text-blue-900">Número</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {ngo.houseNumber}
            </p>
          </div>
          <div className="basis-1/8 flex flex-shrink-0 flex-col">
            <label className="text-blue-900">UF</label>
            <p className="truncate rounded border border-gray-300 px-3 py-2 text-blue-900">
              {ngo.state}
            </p>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-1 flex-col truncate">
            <label className="text-blue-900">Cidade</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {ngo.city}
            </p>
          </div>
          <div className="flex basis-1/4 flex-col">
            <label className="text-blue-900">CEP</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {cepFormatter(ngo.cep)}
            </p>
          </div>
        </div>

        <div className="mb-4 flex w-full gap-4">
          <div className="flex-1">
            <label className="text-blue-900">Email</label>
            <p className="truncate rounded border border-gray-300 px-3 py-2 text-blue-900">
              {ngo.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
