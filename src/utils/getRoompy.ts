import { NextApiRequest } from 'next'
// files
import { DocDataRef, Roompy } from './interfaces'
import { getAsString } from './getAsString'
import { db } from 'configs/firebaseConfig'

export interface GetRoompyReturn {
  roompy: Roompy
  roompyRef: DocDataRef
}

export async function getRoompy(req: NextApiRequest): Promise<GetRoompyReturn> {
  // ref
  const roompyId = getAsString(req.query.id)
  const roompyRef = db.collection('roompies').doc(roompyId)

  // get roompy
  const roompySnap = await roompyRef.get()

  const roompy = {
    ...roompySnap.data(),
    id: roompySnap.id,
  } as Roompy

  return { roompy, roompyRef }
}
