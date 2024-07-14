import { useState } from 'react'
import { registerUser, RegisterDto } from '../src/app/api/api'
import { useRouter } from 'next/router'
import './../src/app/globals.css'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const translateError = (message: string): string => {
  switch (true) {
    case message.includes(
      'Passwords must have at least one non alphanumeric character.',
    ):
      return 'As senhas devem ter pelo menos um caractere não alfanumérico.'
    case message.includes('Passwords must be at least 6 characters.'):
      return 'As senhas devem ter pelo menos 6 caracteres.'
    case message.includes("Passwords must have at least one digit ('0'-'9')."):
      return "As senhas devem ter pelo menos um dígito ('0'-'9')."
    case message.includes(
      "Passwords must have at least one lowercase ('a'-'z').",
    ):
      return "As senhas devem ter pelo menos uma letra minúscula ('a'-'z')."
    case message.includes(
      "Passwords must have at least one uppercase ('A'-'Z').",
    ):
      return "As senhas devem ter pelo menos uma letra maiúscula ('A'-'Z')."
    case message.includes('Username'):
      const email = message.match(/'([^']+)'/)?.[1]
      return `O email '${email}' já está cadastrado em nosso sistema.`
    default:
      return message
  }
}

const RegisterPage = () => {
  const router = useRouter()

  const [formData, setFormData] = useState<RegisterDto>({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await registerUser(formData)
      console.log('Usuário registrado com sucesso!')
      router.push('/LoginPage')
    } catch (error: any) {
      console.error('Erro ao registrar usuário:', error.message)
      setErrorMessage(translateError(error.message))
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={false} />
      <div className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-8">Cadastre-se gratuitamente</h2>
        {errorMessage && (
          <div className="mb-4 text-[#e76e61]">{errorMessage}</div>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e76e61] focus:border-[#e76e61] sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#e76e61] focus:border-[#e76e61] sm:text-sm"
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
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#f39288] hover:bg-[#e98a80] focus:ring-offset-2 focus:ring-[#e76e61]"
          >
            Registrar
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default RegisterPage
