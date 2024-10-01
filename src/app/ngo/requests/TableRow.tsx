import { Check, Circle, X } from 'lucide-react'

export interface Request {
  requestId: number
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
  return (
    <tr className="my-2 border-b border-gray-300">
      <td className="w-44 py-1 text-center text-blue-600">
        {request.animalName}
      </td>
      <td className="w-72 py-1 text-center text-blue-600">
        {request.tutorName}
      </td>
      <td className="w-36 py-1 text-center">
        {request.species === 'dog' ? <span>Cachorro</span> : <span>Gato</span>}
      </td>
      <td className="w-36 py-1 text-center">
        <div className="flex items-center justify-center py-1">
          {request.status === 'analysing' && (
            <>
              <Circle size={16} fill="#FBBF24" className="text-yellow-400" />
              <span className="ml-2 min-w-20">Em análise</span>{' '}
            </>
          )}
          {request.status === 'refused' && (
            <>
              <Circle size={16} fill="#EF4444" className="text-red-400" />
              <span className="ml-2 min-w-20">Recusado</span>{' '}
            </>
          )}
          {request.status === 'approved' && (
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
          disabled={request.status !== 'analysing'}
        >
          <Check size={18} className="text-green-400" />
          Aprovar
        </button>
      </td>
      <td className="w-36">
        <button
          className="flex w-36 items-center justify-center gap-1 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={request.status !== 'analysing'}
        >
          <X size={18} className="text-red-500" />
          Recusar
        </button>
      </td>
    </tr>
  )
}
