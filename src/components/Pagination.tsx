import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

export interface PaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (pageIndex: number) => Promise<void> | void
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-base font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(0)}
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-orange-700 bg-orange-400 p-0 text-white disabled:border-orange-300 disabled:bg-orange-200"
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </button>
          <button
            onClick={() => onPageChange(pageIndex - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-orange-700 bg-orange-400 p-0 text-white disabled:border-orange-300 disabled:bg-orange-200"
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </button>
          <button
            onClick={() => onPageChange(pageIndex + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-orange-700 bg-orange-400 p-0 text-white disabled:border-orange-300 disabled:bg-orange-200"
            disabled={pages <= pageIndex + 1}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </button>
          <button
            onClick={() => onPageChange(pages - 1)}
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-orange-700 bg-orange-400 p-0 text-white disabled:border-orange-300 disabled:bg-orange-200"
            disabled={pages <= pageIndex + 1}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </button>
        </div>
      </div>
    </div>
  )
}
