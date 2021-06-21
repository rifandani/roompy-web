/* eslint-disable no-case-declarations */
import Loader from 'react-loader-spinner'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { GetServerSideProps } from 'next'
// files
import RoompiesComp from 'components/roompies/RoompiesComp'
import { db } from 'configs/firebaseConfig'
import { Roompy } from 'utils/interfaces'

export interface RoompiesPageProps {
  error: boolean
  roompies: Roompy[]
  err: any
}

export default function RoompiesPage({
  error,
  roompies,
  err,
}: RoompiesPageProps): JSX.Element {
  const [busy] = useState<boolean>(false)

  if (error) {
    toast.error(err.message)
    console.error(err)
  }

  if (busy) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Loader
          type="ThreeDots"
          color="Purple"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    )
  }

  return (
    <div className="bg-gray-200">
      <RoompiesComp roompies={roompies} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    // initial roompies
    const roompiesRef = db.collection('roompies') // roompies firestore Ref
    const roompiesSnap = await roompiesRef.get()

    const arr = roompiesSnap.docs.map((el) => ({
      ...el.data(),
      id: el.id,
    })) as Roompy[]

    // render pertama kali tanpa ada query
    if (Object.keys(ctx.query).length === 0) {
      return {
        props: {
          error: false,
          roompies: arr,
          err: null,
        },
      }
    }

    // destructure query objects
    const { ageQue, budgetQue, genderQue, ownPetQue, smokerQue } = ctx.query
    const result = []

    if (ageQue) {
      // ageQue => string '20', '30', '40', '50', '51'
      switch (ageQue) {
        case '51':
          const fAgeQueDiatas = arr.filter((el) => el.age >= Number(ageQue))
          result.push(...fAgeQueDiatas)
          break // kalo gak di break eksekusi code berlanjut ke default statement

        default:
          const fAgeQueDibawah = arr.filter((el) => el.age <= Number(ageQue))
          result.push(...fAgeQueDibawah)
      }
    } else if (budgetQue) {
      // budgetQue => string '500000', '1000000', '2000000', '3000000', '3100000'
      switch (budgetQue) {
        case '3100000':
          const fBudgetQueDiatas = arr.filter(
            (el) => el.budget >= Number(budgetQue)
          )
          result.push(...fBudgetQueDiatas)
          break // kalo gak di break eksekusi code berlanjut ke default statement

        default:
          const fBudgetQueDibawah = arr.filter(
            (el) => el.budget <= Number(budgetQue)
          )
          result.push(...fBudgetQueDibawah)
      }
    } else if (ownPetQue) {
      // ownPetQue => string 'true', ''
      const fOwnPetQue = arr.filter(
        (el) => el.ownPet === (ownPetQue === 'true')
      )
      result.push(...fOwnPetQue)
    } else if (smokerQue) {
      // smokerQue => string 'true', ''
      const fSmokerQue = arr.filter(
        (el) => el.smoker === (smokerQue === 'true')
      )
      result.push(...fSmokerQue)
    } else if (genderQue) {
      // genderQue => string 'Pria', 'Wanita'
      const fGenderQue = arr.filter((el) => el.gender === genderQue)
      result.push(...fGenderQue)
    }

    // filter duplicate value in array
    const final = result.filter(
      (el, i, arr) => i === arr.findIndex((elem) => elem.id === el.id)
    )

    return {
      props: {
        error: false,
        roompies: final, // hasil filtered query roompies
        err: null,
      },
    }
  } catch (err) {
    // kalau error query ke firebase
    return {
      props: {
        error: true,
        roompies: [],
        err,
      },
    }
  }
}
