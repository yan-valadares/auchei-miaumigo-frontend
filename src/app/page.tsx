import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { LoginForm } from '@/app/sign-in/LoginForm'
import dogImageBgOrange from '@/assets/dog-image-bg-orange.jpg'

export default function Home() {
  return (
    <div className="flex min-h-screen w-app items-center justify-center sm:gap-28">
      <div className="hidden place-items-center lg:block">
        <Image
          src={dogImageBgOrange.src}
          alt="Cachorro branco e marrom sentado. No fundo, uma parede laranja"
          width={496}
          height={864}
          unoptimized
          className="rounded-2xl"
        />
      </div>
      <div className="flex min-h-screen flex-col lg:w-1/3">
        <Link
          href="/sign-in/ngo"
          className="my-4 flex justify-end text-xl font-bold text-blue-900 sm:my-8"
        >
          Organização
        </Link>
        <h1 className="my-12 text-3xl font-semibold text-purple-600 sm:my-24 sm:text-4xl">
          Olá, tutor(a)!
        </h1>
        <LoginForm />
        <p className="mt-4 flex justify-center gap-1 text-lg font-semibold">
          Novo por aqui?
          <Link href="/sign-up/tutor" className="text-blue-500 hover:text-blue-700">
            Crie uma conta
          </Link>
        </p>
        <Link
          href=""
          className="mt-20 flex items-center justify-center gap-0.5 text-sm font-semibold text-darkBlue hover:text-blue-800 sm:gap-2 sm:text-lg"
        >
          Ajude na busca pelo amigo perdido de alguém
          <ExternalLink className="mb-0.5 h-4 w-4 sm:h-6 sm:w-6" />
        </Link>
      </div>
    </div>
  )
}
