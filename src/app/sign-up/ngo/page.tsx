import Image from 'next/image'
import Link from 'next/link'

import dogImageBgBlue from '@/assets/dog-image-bg-blue.jpg'

import { SignUpNGOForm } from './SignUpNGOForm'

export default function Home() {
  return (
    <div className="flex min-h-screen w-app items-center justify-center sm:gap-28">
      <div className="hidden place-items-center lg:block">
        <Image
          src={dogImageBgBlue.src}
          alt="Cachorro branco e marrom sentado. No fundo, uma parede laranja"
          width={496}
          height={864}
          unoptimized
          className="rounded-2xl"
        />
      </div>
      <div className="flex min-h-screen flex-col lg:w-1/3">
        <h1 className="mb-6 mt-8 flex w-full justify-center text-3xl font-bold text-purple-600 sm:mb-8 sm:mt-8 sm:text-4xl">
          Informações
        </h1>
        <SignUpNGOForm />
        <p className="mt-2 flex justify-center gap-1 text-lg font-semibold">
          Já possui conta?
          <Link
            href="/sign-in/ngo"
            className="text-blue-500 hover:text-blue-700"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}
