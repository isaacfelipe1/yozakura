import React from 'react'
import Posts from '../components/Posts'
import Navbar from '../components/navbar'
import ClientNavbar from '../components/ClientNavbar'
import { useAuth } from '../src/app/context/AuthContext'
import Footer from '../components/footer'

const PostsPage: React.FC = () => {
  const { isLoggedIn, loading } = useAuth()

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isLoggedIn ? <ClientNavbar /> : <Navbar isLoggedIn={isLoggedIn} />}
      <div className="flex-grow container mx-auto p-4">
        <Posts />
      </div>
      <Footer />
    </div>
  )
}

export default PostsPage
