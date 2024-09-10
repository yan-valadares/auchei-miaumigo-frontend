'use client'

import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import myNGOAnimals from '@/assets/my-ngo-animals.jpg'
import requests from '@/assets/requests.jpg'
import LostAnimalsCarousel from '@/components/LostAnimalsCarousel'

import NGOHeader from '../NGOHeader'

export default function NGOHome() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center border-red-100">
      <NGOHeader />
      <div className="flex h-full w-app flex-col items-center justify-center gap-8 px-32">
        <Link href="">
          <Image
            src={myNGOAnimals.src}
            alt="Imagem de um cachorro marrom feliz que leva aos animais da minha ONG"
            width={256}
            height={128}
            unoptimized
            className="h-40 w-full rounded-2xl"
          />
        </Link>
        <Link
          href=""
          className="flex w-full items-center justify-center gap-4 rounded-lg bg-orange-400 py-2 text-4xl text-white"
        >
          Ajude outras pessoas a acharem o amigo perdido
          <ExternalLink size={32} className="mb-1" />
        </Link>
        <div className="flex w-full flex-col">
          <p className="text-3xl font-semibold text-purple-500">
            Viu eles por aí? Avise o tutor
          </p>
          <LostAnimalsCarousel />
        </div>
        <Link href="">
          <Image
            src={requests.src}
            alt="Gato com olhos esbugalhados que leva para aba solicitações da minha ONG"
            width={256}
            height={128}
            unoptimized
            className="h-40 w-full rounded-2xl"
          />
        </Link>
      </div>
    </div>
  )
}
