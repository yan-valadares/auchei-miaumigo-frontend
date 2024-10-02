import * as Dialog from '@radix-ui/react-dialog'
import { Check, Circle, X } from 'lucide-react'
import { useState } from 'react'

import { serverDevAPI } from '@/lib/axios'

import TutorPerfilDialogAdmView from './TutorPerfilDialogAdmView'

export interface Request {
  id: number
  animalId: number
  tutorId: number
  animalName: string
  tutorName: string
  species: string
  status: string
}

interface TableRowProps {
  request: Request
}

export function TableRow({ request }: TableRowProps) {
  const [currentStatus, setCurrentStatus] = useState(request.status)

  async function handleRefuseRequest() {
    try {
      await serverDevAPI.patch(`/requests/${request.id}`, {
        status: 'refused',
      })
      setCurrentStatus('refused')
    } catch (error) {
      console.error('Failed to refuse the request', error)
    }
  }

  async function handleApproveRequest() {
    try {
      await serverDevAPI.patch(`/requests/${request.id}`, {
        status: 'approved',
      })
      setCurrentStatus('approved')
    } catch (error) {
      console.error('Failed to approve the request', error)
    }
  }

  return (
    <tr className="my-2 border-b border-gray-300">
      <td className="w-44 py-1 text-center text-blue-600">
        {request.animalName}
      </td>
      <td className="w-72 py-1 text-center text-blue-600">
        <Dialog.Root>
          <Dialog.Trigger className="h-fit w-fit">
            {request.tutorName}
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/70" />
            <TutorPerfilDialogAdmView tutorId={request.tutorId} />
          </Dialog.Portal>
        </Dialog.Root>
      </td>
      <td className="w-36 py-1 text-center">
        {request.species === 'dog' ? <span>Cachorro</span> : <span>Gato</span>}
      </td>
      <td className="w-36 py-1 text-center">
        <div className="flex items-center justify-center py-1">
          {currentStatus === 'analysing' && (
            <>
              <Circle size={16} fill="#FBBF24" className="text-yellow-400" />
              <span className="ml-2 min-w-20">Em análise</span>{' '}
            </>
          )}
          {currentStatus === 'refused' && (
            <>
              <Circle size={16} fill="#EF4444" className="text-red-400" />
              <span className="ml-2 min-w-20">Recusado</span>{' '}
            </>
          )}
          {currentStatus === 'approved' && (
            <>
              <Circle size={16} fill="#22C55E" className="text-green-400" />
              <span className="ml-2 min-w-20">Aprovado</span>{' '}
            </>
          )}
        </div>
      </td>
      <td className="w-36">
        <button
          className="flex w-36 items-center justify-center gap-1 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => handleApproveRequest()}
          disabled={currentStatus !== 'analysing'}
        >
          <Check size={18} className="text-green-400" />
          Aprovar
        </button>
      </td>
      <td className="w-36">
        <button
          className="flex w-36 items-center justify-center gap-1 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => handleRefuseRequest()}
          disabled={currentStatus !== 'analysing'}
        >
          <X size={18} className="text-red-500" />
          Recusar
        </button>
      </td>
    </tr>
  )
}
