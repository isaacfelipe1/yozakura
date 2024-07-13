import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../src/app/context/AuthContext'
import { loginUser, LoginDto } from '../src/app/api/api'
import Footer from '../components/footer'
import Navbar from '../components/navbar'

const LoginPage = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      await loginUser(formData)
      console.log('Login bem-sucedido')

      login()

      router.push('/cliente/page')
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      setErrorMessage('Email ou senha incorretos. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={false} />
      <div className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-8">Faça Login</h2>
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white p-12 border border-gray-200 rounded-lg shadow-md text-left"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rememberMe" className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
                className="mr-2"
              />
              Lembrar-me
            </label>
          </div>
          <button
            type="submit"
            className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#f39288] hover:bg-[#e98a80] focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Faça o Login'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default LoginPage
