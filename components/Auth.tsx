import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../src/app/context/AuthContext'

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const { isLoggedIn } = useAuth()
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      setIsClient(true)
      if (!isLoggedIn) {
        router.push('/loginPage')
      } else {
        setLoading(false)
      }
    }, [isLoggedIn, router])

    if (!isClient || loading) {
      return <p>Carregando...</p>
    }

    return isLoggedIn ? <WrappedComponent {...props} /> : null
  }

  return Wrapper
}

export default withAuth
