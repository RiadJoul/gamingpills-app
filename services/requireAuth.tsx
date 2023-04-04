import { useRouter } from 'next/router'
import { useEffect } from 'react';


export default function requireAuth(Component) {
  return function RequireAuth(props) {
    const router = useRouter()

    useEffect(() => {
      const id = localStorage.getItem('id')
      if (!id) {
        router.replace('/auth/login')
      }
    }, [])

    return <Component {...props} />
  }
}
