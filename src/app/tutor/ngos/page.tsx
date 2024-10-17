'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Pagination } from '@/components/Pagination'
import { serverDevAPI } from '@/lib/axios'

import TutorHeader from '../TutorHeader'
import type { Ngo } from './NgoCard'
import NgoCard from './NgoCard'
import { NgoFilters } from './NgoFilters'
import NgoPerfilDialogTutorView from './NgoPerfilDialogTutorView'

export default function NgosList() {
  const [ngos, setNgos] = useState<Ngo[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageIndex = Number(searchParams.get('page')) ?? 0
  const stateParams = searchParams.get('state') || ''
  const cityParams = searchParams.get('city') || ''

  useEffect(() => {
    async function fetchNgos() {
      const response = await serverDevAPI.get(
        `/ngos?_page=${pageIndex}&_per_page=12&state=${stateParams}&city=${cityParams}`,
      )
      setNgos(response.data)

      console.log(response.data)
    }

    fetchNgos()
  }, [pageIndex, stateParams, cityParams])

  function handlePaginate(pageIndex: number) {
    router.push(`/ngos?page=${pageIndex}&_per_page=12`)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <TutorHeader />
      <div className="mt-3 flex h-full w-app flex-col items-center gap-2 px-32">
        <div className="mb-2 flex w-full items-start text-4xl font-semibold text-purple-500">
          Ajude as pessoas a acharem seu amigos perdidos!
        </div>
        <NgoFilters />
        <div className={`flex w-full flex-1 flex-wrap items-start gap-8`}>
          {ngos.map((ngo) => (
            <Dialog.Root key={ngo.id}>
              <Dialog.Trigger className="h-fit w-fit">
                <NgoCard ngo={ngo} />
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/70" />
                <NgoPerfilDialogTutorView ngoId={ngo.id} />
              </Dialog.Portal>
            </Dialog.Root>
          ))}
        </div>
        <div className="mb-3 flex w-full items-center justify-end">
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
