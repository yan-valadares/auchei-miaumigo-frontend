import axios from 'axios'

import { env } from '@/env'

if (!env.NEXT_PUBLIC_IBGE_API_URL || !env.NEXT_PUBLIC_SERVER_DEV_URL) {
  throw new Error(
    'A variável de ambiente NEXT_PUBLIC_IBGE_API_URL não está definida.',
  )
}

export const ibgeAPI = axios.create({
  baseURL: env.NEXT_PUBLIC_IBGE_API_URL,
})

export const serverDevAPI = axios.create({
  baseURL: env.NEXT_PUBLIC_SERVER_DEV_URL,
})
