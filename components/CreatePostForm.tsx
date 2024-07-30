import React, { useState } from 'react'
import { useAuth } from '../src/app/context/AuthContext'
import { createPost, CreatePostDto } from '../src/app/api/api'
import { useRouter } from 'next/router'

const CreatePostForm = () => {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const [formData, setFormData] = useState<CreatePostDto>({
    title: '',
    content: '',
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!isLoggedIn) {
        throw new Error('Usuário não autenticado')
      }
      const createdPost = await createPost(formData)
      console.log('Post criado com sucesso!', createdPost)
      setFormData({ title: '', content: '' })

      router.push(`/cliente/${createdPost.id}`)
    } catch (error) {
      console.error('Erro ao criar post:', error)
      setErrorMessage(
        'Erro ao criar post. Por favor, tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-start justify-center min-h-screen  pt-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-12 border border-gray-200 rounded-lg shadow-md text-left"
      >
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className=" text-sm font-medium text-gray-700"
          >
            Conteúdo
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className={`w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#f39288] hover:bg-[#e98a80] focus:ring-offset-2 focus:ring-indigo-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Carregando...' : 'Criar Post'}
        </button>
      </form>
    </div>
  )
}

export default CreatePostForm
