import React, { useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Posts from '../components/Posts'
import Footer from '../components/footer'
import './../src/app/globals.css'
import Navbar from '../components/navbar'
import ClientNavbar from '../components/ClientNavbar'
import VLibras from 'vlibras-nextjs'
import WhatsApp from '../components/whatsapp'
import { useAuth } from '../src/app/context/AuthContext'
import { parseCookies } from 'nookies'

interface HomePageProps {
  isLoggedIn: boolean
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn }) => {
  const { login, loading } = useAuth()

  useEffect(() => {
    if (isLoggedIn) {
      login()
    }
  }, [isLoggedIn, login])

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isLoggedIn ? <ClientNavbar /> : <Navbar isLoggedIn={isLoggedIn} />}
      <div className="flex-grow container mx-auto p-4">
        <VLibras forceOnload />
        <main className="container mx-auto p-4">
          <article className="bottom-6 text-lg text-justify bg-primary m-1 rounded-lg p-6">
            <p className="text-start-md">
              Bem-vindo! Somos uma equipe apaixonada por compartilhar
              conhecimento e inspirar outras pessoas. Neste blog, você
              encontrará uma variedade de artigos sobre diversos temas, desde
              tecnologia até dicas de estilo de vida. Nosso objetivo é fornecer
              conteúdo de qualidade que informe, eduque e entretenha nossos
              leitores.
            </p>
            <p>
              Nossa equipe está empenhada em manter este blog atualizado com
              novos artigos regularmente. Esperamos que você desfrute da sua
              visita e encontre informações úteis aqui.
            </p>
          </article>
          <Posts />
        </main>
        <WhatsApp />
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx)
  const isLoggedIn = !!cookies.isLoggedIn

  return {
    props: {
      isLoggedIn,
    },
  }
}

export default HomePage
