import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import catImageBgOrange from '@/assets/cat-image-bg-orange.jpg'
import { LoginForm } from '@/components/LoginForm'

export default function Home() {
  return (
    <div className="flex min-h-screen w-app items-center justify-center sm:gap-28">
      <div className="hidden place-items-center lg:block">
        <Image
          src={catImageBgOrange.src}
          alt="Cachorro branco e marrom sentado. No fundo, uma parede laranja"
          sizes="(max-width: 604px) none, (max-width: 768px) 350px"
          width={496}
          height={864}
          unoptimized
          className="rounded-2xl"
        />
      </div>
      <div className="flex min-h-screen flex-col">
        <Link
          href="/"
          className="my-4 flex justify-end text-xl font-bold text-blue-900 sm:my-8"
        >
          Tutor
        </Link>
        <h1 className="my-12 text-3xl font-semibold text-purple-600 sm:my-24 sm:text-4xl">
          Olá, ADM!
        </h1>
        <LoginForm />
        <Link
          href=""
          className="mt-4 flex justify-center text-xl font-bold text-blue-900 hover:text-blue-700"
        >
          Cadastrar minha organização
        </Link>
        <Link
          href=""
          className="mt-20 flex items-center justify-center gap-1 text-sm font-semibold text-darkBlue hover:text-blue-800 sm:gap-2 sm:text-xl"
        >
          Ajude na busca pelo amigo perdido de alguém
          <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>
      </div>
    </div>
  )
}
