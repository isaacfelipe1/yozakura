import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ClientNavbar from '../../components/ClientNavbar'
import Footer from '../../components/footer'
import { useAuth } from '../../src/app/context/AuthContext'
import withAuth from '../../components/Auth'
import { fetchUser, User } from '../../src/app/api/api'
import DeleteAccountButton from '../../components/DeleteAccountButton'

const ClientePage: React.FC = () => {
  const { logout, isLoggedIn } = useAuth()
  const router = useRouter()

  const [message, setMessage] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData: User = await fetchUser()
        setUserEmail(userData.email)
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error)
      }
    }

    if (isLoggedIn) {
      getUserData()
    }
  }, [isLoggedIn])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <ClientNavbar />
      <div className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-8">Dashboard</h2>
        <p>Bem-vindo ao Blog Yozakura, {userEmail}!</p><hr  className="my-4"/>
        <DeleteAccountButton />
        {message && (
          <div
            className={`mb-4 ${message.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}
          >
            {message}
          </div>
        )}
        
      </div>
      <Footer />
    </div>
  )
}

export default withAuth(ClientePage)
