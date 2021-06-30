import { DocDataRef, DocDataSnap, Roompy } from './interfaces'
import { db } from 'configs/firebaseConfig'

export interface GetRoompyReturn {
  roompy: Roompy
  roompyRef: DocDataRef
  roompySnap: DocDataSnap
}

export async function getRoompy(roompyId: string): Promise<GetRoompyReturn> {
  // get roompy ref
  const roompyRef = db.collection('roompies').doc(roompyId)

  // get roompy snap
  const roompySnap = await roompyRef.get()

  const roompy = {
    ...roompySnap.data(),
    id: roompySnap.id,
  } as Roompy

  return { roompy, roompyRef, roompySnap }
}
