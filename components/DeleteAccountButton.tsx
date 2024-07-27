import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { deleteUser } from '../src/app/api/api'
import { useAuth } from '../src/app/context/AuthContext'

const DeleteAccountButton: React.FC = () => {
  const { logout } = useAuth()
  const router = useRouter()
  const [message, setMessage] = useState<string | null>(null)

  const handleDeleteAccount = async () => {
    if (
      confirm(
        'Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.',
      )
    ) {
      try {
        await deleteUser()
        setMessage('Conta deletada com sucesso.')
        logout()
        router.push('/')
      } catch (error) {
        console.error('Erro ao deletar a conta:', error)
        setMessage('Erro ao deletar a conta. Por favor, tente novamente.')
      }
    }
  }

  return (
    <>
      {message && (
        <div
          className={`mb-4 ${message.includes('sucesso') ? 'text-green-500' : 'text-red-500'}`}
        >
          {message}
        </div>
      )}
      <button
        onClick={handleDeleteAccount}
        className=" inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:ring-offset-2 focus:ring-red-500 mt-4"
      >
        Deletar Conta
      </button>
    </>
  )
}

export default DeleteAccountButton