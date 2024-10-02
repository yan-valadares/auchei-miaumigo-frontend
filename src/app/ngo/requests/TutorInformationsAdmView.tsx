import Image from 'next/image'

export interface Tutor {
  id: number
  firstName: string
  lastName: string
  cpf: string
  phone: string
  email: string
  cep: string
  streetName: string
  houseNumber: string
  state: string
  city: string
  houseType: 'house' | 'apartment'
  avatarUrl: string
}

interface TutorProps {
  tutor: Tutor
}

export default function TutorInformations({ tutor }: TutorProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full items-center justify-center">
        <div className="flex h-28 w-28 overflow-hidden rounded-full">
          <Image
            src={tutor.avatarUrl}
            alt="Imagem do perfil do usuário"
            width={144}
            height={144}
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex w-full gap-4">
          <div className="flex flex-1 flex-col">
            <label className="text-blue-900">Nome</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {tutor.firstName}
            </p>
          </div>
          <div className="flex flex-1 flex-col">
            <label className="text-blue-900">Último nome</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {tutor.lastName}
            </p>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-1 flex-col">
            <label className="text-blue-900">CPF</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {tutor.cpf}
            </p>
          </div>
          <div className="flex flex-1 flex-col">
            <label className="text-blue-900">Telefone</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {tutor.phone}
            </p>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex-1">
            <label className="text-blue-900">Email</label>
            <p className="truncate rounded border border-gray-300 px-3 py-2 text-blue-900">
              {tutor.email}
            </p>
          </div>
          <div className="flex basis-1/4 flex-col">
            <label className="text-blue-900">CEP</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {tutor.cep}
            </p>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="flex flex-1 flex-col">
            <label className="text-blue-900">Logradouro</label>
            <p className="truncate rounded border border-gray-300 px-3 py-2 text-blue-900">
              {tutor.streetName}
            </p>
          </div>
          <div className="flex flex-shrink-0 basis-1/6 flex-col">
            <label className="text-blue-900">Número</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {tutor.houseNumber}
            </p>
          </div>
        </div>

        <div className="flex w-full gap-4">
          <div className="basis-1/8 flex flex-shrink-0 flex-col">
            <label className="text-blue-900">UF</label>
            <p className="truncate rounded border border-gray-300 px-3 py-2 text-blue-900">
              {tutor.state}
            </p>
          </div>
          <div className="flex flex-1 flex-col truncate">
            <label className="text-blue-900">Cidade</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {tutor.city}
            </p>
          </div>
          <div className="flex flex-shrink-0 basis-2/6 flex-col">
            <label className="text-blue-900">Tipo de casa</label>
            <p className="rounded border border-gray-300 px-3 py-2 text-blue-900">
              {tutor.houseType === 'house' ? 'Casa' : 'Apartamento'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
