import { CircleUserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NGOHeader() {
  const pathName = usePathname()

  const navItems = [
    { name: 'Home', path: '/ngo/home' },
    { name: 'Animais', path: '/animals' },
    { name: 'Solicitações', path: '/requests' },
    { name: 'Animais perdidos', path: '/lost-animals' },
  ]

  const isActive = (path: string) => {
    const regex = new RegExp(path.replace('*', '.*'))
    return regex.test(pathName)
  }

  return (
    <header className="flex h-14 w-full items-center justify-center gap-52 bg-purple-600">
      <div className="flex h-full w-40 items-center justify-center bg-slate-400">
        Logo
      </div>
      <nav className="flex gap-8 text-2xl font-semibold text-slate-100">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path.replace('/*', '')}
            className={`${isActive(item.path) ? 'underline hover:scale-110' : ''} `}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <button className="h-fit w-fit">
        <CircleUserRound size={32} className="text-white" />
      </button>
    </header>
  )
}
