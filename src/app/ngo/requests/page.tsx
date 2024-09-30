'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Circle, Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { Animal } from '@/components/AnimalCard'
import { Pagination } from '@/components/Pagination'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { InputVariant } from '@/components/ui/input-variant'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { serverDevAPI } from '@/lib/axios'

import NGOHeader from '../NGOHeader'

const requestsFormSchema = z.object({
  animalName: z.string().optional(),
  tutorName: z.string().optional(),
  species: z.enum(['dog', 'cat']).optional(),
  status: z.enum(['refused', 'analysing', 'approved']).optional(),
})

type RequestsFormData = z.infer<typeof requestsFormSchema>

export default function LostAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageIndex = Number(searchParams.get('page')) ?? 0

  useEffect(() => {
    async function fetchAnimals() {
      const response = await serverDevAPI.get(
        `/lost-animals?_page=${pageIndex}&_per_page=12`,
      )
      setAnimals(response.data)
    }
    fetchAnimals()
  }, [pageIndex])

  const requestsForm = useForm<RequestsFormData>({
    resolver: zodResolver(requestsFormSchema),
  })

  function onSubmit({
    animalName,
    species,
    status,
    tutorName,
  }: RequestsFormData) {
    // router.push(
    //   `/lost-animals?_page=${pageIndex}&_per_page=12&state=${state}&city=${city || ''}`,
    // )
    console.log(animalName)
    console.log(species)
    console.log(status)
    console.log(tutorName)
  }

  function handlePaginate(pageIndex: number) {
    router.push(`/lost-animals?page=${pageIndex}&_per_page=12`)
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <NGOHeader />
      <div className="mt-3 flex h-full w-app flex-col items-center gap-2 px-32">
        <div className="mb-2 flex w-full items-start text-4xl font-semibold text-purple-500">
          Requisições de adoção
        </div>
        <Form {...requestsForm}>
          <form
            onSubmit={requestsForm.handleSubmit(onSubmit)}
            className="flex w-full justify-end space-x-6"
          >
            <FormField
              control={requestsForm.control}
              name="animalName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputVariant
                      placeholder="Nome do animal"
                      {...field}
                      value={field.value ?? ''}
                      className="h-full py-1 text-base text-darkBlue"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={requestsForm.control}
              name="tutorName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputVariant
                      placeholder="Nome do tutor"
                      {...field}
                      value={field.value ?? ''}
                      className="h-full py-1 text-base text-darkBlue"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="species"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                    }}
                    value={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="border-orange-700 bg-orange-400 p-2 text-xl text-white">
                        <SelectValue placeholder="Espécie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dog">Cachorro</SelectItem>
                      <SelectItem value="cat">Gato</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                    }}
                    value={field.value ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-fit border-orange-700 bg-orange-400 py-2 text-xl text-white">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="approved"
                        className="flex w-full items-center justify-center px-0 py-2"
                      >
                        Aprovado
                      </SelectItem>
                      <SelectItem
                        value="analysing"
                        className="flex w-full items-center justify-center px-0 py-2"
                      >
                        Em análise
                      </SelectItem>
                      <SelectItem
                        value="refused"
                        className="flex w-full items-center justify-center px-0 py-2"
                      >
                        Recusado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="rounded-md border border-purple-800 bg-purple-500 px-3 text-white hover:bg-purple-600"
            >
              <Search size={28} />
            </button>
          </form>
        </Form>
        <div className="flex w-full flex-1 flex-wrap items-start gap-8">
          <Table className="border-slate-700">
            <TableHeader>
              <TableRow>
                <TableHead className="w-4 p-1" />
                <TableHead className="w-44">Nome do animal</TableHead>
                <TableHead className="w-60">Nome do tutor</TableHead>
                <TableHead className="w-36">Espécie</TableHead>
                <TableHead className="w-36">Status</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="w-4 p-1">
                  <Search size={16} />
                </TableCell>
                <TableCell className="w-40">Paçoca</TableCell>
                <TableCell className="w-56">Alexandrina Monteirodias</TableCell>
                <TableCell className="w-32">Cachorro</TableCell>
                <TableCell className="flex w-fit items-center justify-center gap-1">
                  <Circle size={12} />
                  Em análise
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="mb-3 flex w-full">
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
