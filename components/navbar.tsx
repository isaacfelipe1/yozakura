import React from 'react'
import Link from 'next/link'
import './../src/app/globals.css'
import { useAuth } from '../src/app/context/AuthContext'

interface NavbarProps {
  isLoggedIn: boolean
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-[#000000] text-white py-10 px-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-[#F2E981] text-xl font-bold">
            Blog Yozakura
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="text-white">
                Perfil
              </Link>
              <button onClick={handleLogout} className="text-white">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                href="/LoginPage"
                className="text-white font-bold hover:text-[#F2E981]"
              >
                Entrar
              </Link>
              <Link
                href="/RegisterPage"
                className="text-white font-bold hover:text-[#F2E981]"
              >
                Cadastre-se
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
