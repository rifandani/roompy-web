import { ColDataRef, ColDataSnap, Roompy } from './interfaces'
import { db } from 'configs/firebaseConfig'

export interface GetRoompiesReturn {
  roompies: Roompy[]
  roompiesRef: ColDataRef
  roompiesSnap: ColDataSnap
}

export async function getRoompies(): Promise<GetRoompiesReturn> {
  // get roompies ref
  const roompiesRef = db.collection('roompies')

  // get roompies snap
  const roompiesSnap = await roompiesRef.get()

  const roompies = roompiesSnap.docs.map((roompy) => ({
    ...roompy.data(),
    id: roompy.id,
  })) as Roompy[]

  return { roompies, roompiesRef, roompiesSnap }
}
