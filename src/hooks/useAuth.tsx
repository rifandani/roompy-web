import { useState, useEffect, Dispatch, SetStateAction } from 'react'
// files
import { auth } from '../configs/firebaseConfig'
import { FireUser } from '../utils/interfaces'

function useAuth() {
  const [authUser, setAuthUser] = useState<FireUser | null>(null)

  useEffect(() => {
    // triggered ketika user signed in / signed out
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // jika user signed in
        setAuthUser(user)
      } else {
        // jika user signed out
        setAuthUser(null)
      }
    })

    // cleanup
    return () => unsubscribe()
  }, [])

  return [authUser, setAuthUser] as [
    FireUser | null,
    Dispatch<SetStateAction<FireUser>>
  ]
}

export default useAuth
