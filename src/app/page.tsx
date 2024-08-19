import Image from 'next/image'

import dogImageBgOrange from '../assets/dog-image-bg-orange.jpg'
import { LoginForm } from '../components/LoginForm'

export default function Home() {
  return (
    <div className="w-app flex min-h-screen items-center justify-between gap-12">
      <div className="block w-1/2 items-center justify-center sm:block">
        <Image
          src={dogImageBgOrange.src}
          alt="Cachorro branco e marrom sentado. No fundo, uma parede laranja"
          sizes="(max-width: 604px) none, (max-width: 768px) 350px"
          width={496}
          height={864}
          unoptimized
          className="rounded-2xl"
        />
      </div>
      <div className="flex min-h-screen w-3/4 flex-col px-10">
        <a
          href=""
          className="my-6 flex w-3/4 content-end text-xl font-bold text-blue-900"
        >
          Organização
        </a>
        <h1 className="my-24 text-4xl font-semibold text-purple-600">
          Olá, tutor(a)!
        </h1>
        <LoginForm />
        <p className="mt-4 flex w-3/4 justify-center text-lg font-semibold">
          Novo por aqui?{' '}
          <a href="" className="text-blue-500 hover:text-blue-700">
            {' '}
            Crie uma conta
          </a>
        </p>
        <a
          href=""
          className="text-darkBlue mt-20 flex w-3/4 justify-center text-xl font-semibold hover:text-blue-800"
        >
          Ajude na busca pelo amigo perdido de alguém
        </a>
      </div>
    </div>
  )
}
