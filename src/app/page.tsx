import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

import dogImageBgOrange from '../assets/dog-image-bg-orange.jpg'
import { LoginForm } from '../components/LoginForm'

export default function Home() {
  return (
    <div className="flex min-h-screen w-app items-center justify-center sm:gap-28">
      <div className="hidden place-items-center sm:block">
        <Image
          src={dogImageBgOrange.src}
          alt="Cachorro branco e marrom sentado. No fundo, uma parede laranja"
          // sizes="(max-width: 604px) none, (max-width: 768px) 350px"
          width={496}
          height={864}
          unoptimized
          className="rounded-2xl"
        />
      </div>
      <div className="flex min-h-screen flex-col">
        <a
          href=""
          className="my-4 flex justify-end text-xl font-bold text-blue-900 sm:my-8"
        >
          Organização
        </a>
        <h1 className="my-12 text-3xl font-semibold text-purple-600 sm:my-24 sm:text-4xl">
          Olá, tutor(a)!
        </h1>
        <LoginForm />
        <p className="mt-4 flex justify-center gap-1 text-lg font-semibold">
          Novo por aqui?{' '}
          <a href="" className="text-blue-500 hover:text-blue-700">
            {' '}
            Crie uma conta
          </a>
        </p>
        <a
          href=""
          className="mt-20 flex items-center justify-center gap-1 text-sm font-semibold text-darkBlue hover:text-blue-800 sm:gap-2 sm:text-xl"
        >
          Ajude na busca pelo amigo perdido de alguém
          <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6" />
        </a>
      </div>
    </div>
  )
}
