import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import NgoInformationsTutorView from './NgoInformationsTutorView'

interface NgoPerfilDialogTutorViewProps {
  ngoId: string
}

export default function NgoPerfilDialogTutorView({
  ngoId,
}: NgoPerfilDialogTutorViewProps) {
  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 w-dialog max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-6 py-4 text-gray-900 shadow">
      <Dialog.Title hidden>Ngo Perfil</Dialog.Title>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-end">
          <Dialog.Close>
            <X />
          </Dialog.Close>
        </div>
        <NgoInformationsTutorView ngoId={ngoId} />
      </div>
    </Dialog.Content>
  )
}
