import React from 'react'
import CreatePostForm from '../../components/CreatePostForm'
import ClientNavbar from '../../components/ClientNavbar'
import Footer from '../../components/footer'
import withAuth from '../../components/Auth'

const CreatePostPage: React.FC = () => {
  return (
    <>
      <ClientNavbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <CreatePostForm />
      </div>
      <Footer />
    </>
  )
}

export default withAuth(CreatePostPage)
