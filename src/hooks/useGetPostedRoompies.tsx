import { useEffect, useState } from 'react'
// files
import { FireUser, Roompies, User } from '../utils/interfaces'
import { db } from '../configs/firebaseConfig'
import { toast } from 'react-toastify'

export default function useGetPostedRoompies(userContext: FireUser) {
  const userRef = db.collection('users').doc(userContext.uid)

  const [userDetail, setUserDetail] = useState<null | User>(null)
  const [userPostedRoompies, setUserPostedRoompies] = useState<[] | Roompies>(
    []
  )
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    getPostedRoompies()
  }, [userDetail])

  async function getUser() {
    try {
      const userSnap = await userRef.get()

      const userData = {
        ...userSnap.data(),
        id: userContext.uid,
      }

      setUserDetail(userData as User)
    } catch (err) {
      return toast.error(err.message)
    }
  }

  async function getPostedRoompies() {
    if (userDetail === null)
      return console.log('First render. userDetail => ', userDetail)

    try {
      const postedRoompiesLength = userDetail.postedRoompies.length
      let roompyData = []
      // setIsLoading(true)

      if (postedRoompiesLength === 0) {
        setUserPostedRoompies([])
        // setIsLoading(false)
      } else if (postedRoompiesLength === 1) {
        const roompyRef = db
          .collection('roompies')
          .doc(userDetail.postedRoompies[0])
        const roompySnap = await roompyRef.get()

        roompyData.push({
          ...roompySnap?.data(),
          id: roompySnap?.id,
        })

        setUserPostedRoompies(roompyData)
        // setIsLoading(false)
      } else {
        for (let i = 0; i < postedRoompiesLength; i++) {
          const roompyRef = db
            .collection('roompies')
            .doc(userDetail.postedRoompies[i])
          const roompySnap = await roompyRef.get()

          roompyData.push({
            ...roompySnap?.data(),
            id: roompySnap?.id,
          })

          if (i === postedRoompiesLength - 1) {
            setUserPostedRoompies(roompyData)
            // setIsLoading(false)
          }
        }
      }
    } catch (err) {
      return toast.error(err.message)
    }
  }

  return [userDetail, userPostedRoompies] as [User | null, Roompies | []]
  // return [userDetail, , userPostedRoompies, isLoading];
}
