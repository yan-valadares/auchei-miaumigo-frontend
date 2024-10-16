'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import TutorHeader from '@/app/tutor/TutorHeader'
import findYourFriend from '@/assets/find-your-friend.jpg'
import lostAnimal from '@/assets/lost-animal.jpg'
import LostAnimalsCarousel from '@/components/LostAnimalsCarousel'

import CreateLostAnimalDialog from './CreateLostAnimalDialog'

export default function TutorHome() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center border-red-100">
      <TutorHeader />
      <div className="flex h-full w-app flex-col items-center justify-center gap-8 px-32">
        <Dialog.Root>
          <Dialog.Trigger>
            <Image
              src={lostAnimal.src}
              alt="Imagem de um cachorro triste que leva a um site para ajudar a compreender os benefícios da adoção"
              width={256}
              height={128}
              unoptimized
              className="h-40 w-full rounded-2xl"
            />
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/70" />
            <CreateLostAnimalDialog />
          </Dialog.Portal>
        </Dialog.Root>

        <Link
          href="/lost-animals"
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
        <Link href="/tutor/animals-for-adoption">
          <Image
            src={findYourFriend.src}
            alt="Imagem de um cachorro olhando para o horizonte que leva para aba de busca de animais para adoção"
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
