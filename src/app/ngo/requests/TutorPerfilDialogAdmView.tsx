import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { serverDevAPI } from '@/lib/axios'

import TutorInformationsAdmView, {
  type Tutor,
} from './TutorInformationsAdmView'

interface TutorAdmViewDialogProps {
  tutorId: number
}

export default function TutorPerfilAdmViewDialog({
  tutorId,
}: TutorAdmViewDialogProps) {
  const [tutor, setTutor] = useState<Tutor>()

  useEffect(() => {
    async function fetchTutor() {
      try {
        const response = await serverDevAPI.get(`/tutors/${tutorId}`)
        setTutor(response.data)
      } catch (error) {
        console.error('Erro ao buscar informações do tutor:', error)
      }
    }
    fetchTutor()
  }, [tutorId])

  return (
    <Dialog.Content className="fixed left-1/2 top-1/2 w-dialog max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-white px-6 py-4 text-gray-900 shadow">
      <Dialog.Title hidden>User Perfil</Dialog.Title>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-end">
          <Dialog.Close>
            <X />
          </Dialog.Close>
        </div>
        {tutor ? (
          <TutorInformationsAdmView tutor={tutor} />
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </Dialog.Content>
  )
}
