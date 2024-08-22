import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_IBGE_API_URL: z.string().url(),
})

export const env = envSchema.parse({
  NEXT_PUBLIC_IBGE_API_URL: process.env.NEXT_PUBLIC_IBGE_API_URL,
})
