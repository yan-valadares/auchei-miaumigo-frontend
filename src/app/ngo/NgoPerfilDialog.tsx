import * as Dialog from '@radix-ui/react-dialog'
import { PencilLine, X } from 'lucide-react'
import { useState } from 'react'

import NgoInformations from './NgoInformations'
import NgoUpdateForm from './NgoUpdateForm'

export default function NgoPerfilDialog() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 w-dialog max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-6 py-4 text-gray-900 shadow">
      <Dialog.Title hidden>Ngo Perfil</Dialog.Title>
      <div className="flex flex-col gap-6">
        {isEditing ? (
          <div className="flex items-center justify-end">
            <Dialog.Close>
              <X />
            </Dialog.Close>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <button onClick={() => setIsEditing(true)}>
              <PencilLine />
            </button>
            <Dialog.Close>
              <X />
            </Dialog.Close>
          </div>
        )}
        {isEditing ? (
          <NgoUpdateForm setIsEditing={setIsEditing} />
        ) : (
          <NgoInformations />
        )}
      </div>
    </Dialog.Content>
  )
}
