import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchPostById } from '../../src/app/api/api'
import ClientNavbar from '../../components/ClientNavbar'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import './../../src/app/globals.css'
import { useAuth } from '../../src/app/context/AuthContext'

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
}

const PostPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState<Post | null>(null)
  const { isLoggedIn, loading } = useAuth()
  const [postLoading, setPostLoading] = useState(true)

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const fetchedPost = await fetchPostById(Number(id))
          setPost(fetchedPost)
        } catch (error) {
          console.error('Erro ao buscar post:', error)
        } finally {
          setPostLoading(false)
        }
      }
      fetchPost()
    }
  }, [id])

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn)
  }, [isLoggedIn])

  if (loading || postLoading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isLoggedIn ? <ClientNavbar /> : <Navbar isLoggedIn={isLoggedIn} />}
      <div className="flex-grow container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
        <div className="mb-4">{post?.content}</div>
      </div>
      <div className="container mx-auto p-4 text-gray-500">
        <p>
          Publicado em:{' '}
          {post?.createdAt
            ? new Date(post.createdAt).toLocaleString()
            : 'Data não disponível'}
        </p>
      </div>
      <Footer />
    </div>
  )
}

export default PostPage
