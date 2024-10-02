'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Pagination } from '@/components/Pagination'
import { serverDevAPI } from '@/lib/axios'

import NGOHeader from '../NGOHeader'
import { TableFilters } from './TableFilters'
import { type Request, TableRow } from './TableRow'

export default function Requests() {
  const [requests, setRequests] = useState<Request[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageIndex = Number(searchParams.get('page')) ?? 0
  const animalNameParams = searchParams.get('animalName') || ''
  const tutorNameParams = searchParams.get('tutorName') || ''
  const speciesParams = searchParams.get('species') || ''
  const statusParams = searchParams.get('status') || ''

  useEffect(() => {
    async function fetchRequest() {
      const response = await serverDevAPI.get(
        `/requests?_page=${pageIndex}&_per_page=17&animalName=${animalNameParams}&tutorName=${tutorNameParams}&species=${speciesParams}&status=${statusParams}`,
      )
      setRequests(response.data)
    }
    fetchRequest()
  }, [
    pageIndex,
    animalNameParams,
    tutorNameParams,
    speciesParams,
    statusParams,
  ])

  function handlePaginate(pageIndex: number) {
    router.push(`/requests?page=${pageIndex}&_per_page=17`)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <NGOHeader />
      <div className="mt-3 flex h-full w-app flex-col items-center gap-2 px-32">
        <div className="mb-2 flex w-full items-start text-4xl font-semibold text-purple-500">
          Requisições de adoção
        </div>
        <TableFilters />
        <div className="flex w-full flex-1 flex-wrap items-start gap-8">
          <table className="mt-4 w-full overflow-hidden rounded-lg border border-gray-300 shadow-lg">
            <thead className="bg-slate-200 text-gray-700">
              <tr className="py-2">
                <th className="w-44 p-2 text-center font-semibold">
                  Nome do animal
                </th>
                <th className="w-72 text-center font-semibold">
                  Nome do tutor
                </th>
                <th className="w-36 text-center font-semibold">Espécie</th>
                <th className="w-36 text-center font-semibold">Status</th>
                <th className="w-36 text-center font-semibold"></th>
                <th className="w-36 text-center font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <TableRow key={request.id} request={request} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-3 flex w-full justify-end">
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={pageIndex}
            totalCount={12}
            perPage={12}
          />
        </div>
      </div>
    </div>
  )
}
