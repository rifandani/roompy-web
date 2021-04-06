import { NextApiRequest } from 'next'
// files
import { db } from '../configs/firebaseConfig'
import { getAsString } from './getAsString'
import { Roompy } from './interfaces'

export default async function getRoompy(req: NextApiRequest) {
  // ref
  const roompyId = getAsString(req.query.id)
  const roompyRef = db.collection('roompies').doc(roompyId)

  // get roompy
  const roompySnap = await roompyRef.get()

  const roompy = {
    ...roompySnap.data(),
    id: roompySnap.id,
  }

  return { roompy: roompy as Roompy, roompyRef }
}
