export default function TutorHome() {
  return (
    <div className="flex h-full w-full flex-col border-red-100">
      <header className="flex h-14 w-full items-center justify-center gap-16 bg-purple-600">
        <div className="flex h-full w-40 items-center justify-center bg-slate-400">
          Logo
        </div>
        <nav className="flex gap-8 text-xl font-semibold text-slate-100">
          <a href="" className="hover:scale-110">
            Home
          </a>
          <a href="" className="hover:scale-110">
            Adotar animal
          </a>
          <a href="" className="hover:scale-110">
            ONGs
          </a>
          <a href="" className="hover:scale-110">
            Animais perdidos
          </a>
        </nav>
      </header>
    </div>
  )
}
