import firebase from 'firebase'
import { Readable } from 'stream'
import { NextApiRequest } from 'next'
import { Dispatch, SetStateAction } from 'react'

/* --------------------------------- roompy --------------------------------- */

export interface Favorites {
  roompies: string[]
  rooms: string[]
}

export interface HomePref {
  room: string
  parking: string
  wifi: string
  bathroom: string
}

export interface LocPref {
  lat: number
  lng: number
}

export interface RoompiesPref {
  gender: string
  ageFrom: number
  ageTo: number
  smoker: string
  pet: string
}

export interface Roompy {
  id?: string
  age: number
  budget: number
  createdAt: number
  desc: string
  gender: string
  homePref: HomePref
  smoker: boolean
  locPref: LocPref[]
  moveDate: number
  name: string
  occupation: string
  ownPet: boolean
  phoneNumber: string
  photoURL: string
  postedBy: string // awalnya DocRef
  roompiesPref: RoompiesPref
  stayLength: number
  updatedAt: number
}

export interface RoompyProps {
  roompy: Roompy
}

export interface RoompiesProps {
  roompies: Roompy[]
}

/* ---------------------------------- user ---------------------------------- */

export interface User {
  id?: string
  createdAt: number
  email: string
  favorites: Favorites
  messagesFrom: string[]
  messagesTo: string[]
  postedRoompies: string[] // awalnya DocRef
  postedRooms: string[] // awalnya DocRef
  premium: boolean
  premiumUntil: number
  token: string
  updatedAt: number
  username: string
}

export interface UserProps {
  user: User
}

export interface UserContextState {
  user: FireUser | null
  setUser: firebase.User | Dispatch<SetStateAction<firebase.User>>
}

/* -------------------------------------------- other ------------------------------------------- */

export interface Postal {
  urban: string
  sub_district: string
  city: string
  province_code: string
  postal_code: string
}

export interface ImagePreview extends File {
  preview?: string
}

/** Object containing file metadata and access information. */
export interface MulterFile {
  /** Name of the form field associated with this file. */
  fieldname: string
  /** Name of the file on the uploader's computer. */
  originalname: string
  /**
   * Value of the `Content-Transfer-Encoding` header for this file.
   * @deprecated since July 2015
   * @see RFC 7578, Section 4.7
   */
  encoding: string
  /** Value of the `Content-Type` header for this file. */
  mimetype: string
  /** Size of the file in bytes. */
  size: number
  /**
   * A readable stream of this file. Only available to the `_handleFile`
   * callback for custom `StorageEngine`s.
   */
  stream: Readable
  /** `DiskStorage` only: Directory to which this file has been uploaded. */
  destination: string
  /** `DiskStorage` only: Name of this file within `destination`. */
  filename: string
  /** `DiskStorage` only: Full path to the uploaded file. */
  path: string
  /** `MemoryStorage` only: A Buffer containing the entire file. */
  buffer: Buffer
}

export interface NextApiRequestWithMulterFile extends NextApiRequest {
  file: MulterFile
}

export interface AuthCookiePayload {
  sub: string // subject, whom the token refers to
  iss?: string // issuer, token creator
  iat?: number // issuedAt, seconds since Unix epoch
  exp?: number // expiredAt, seconds since Unix epoch
}

// firebase type
export type DocRef = firebase.firestore.DocumentReference
export type DocDataRef =
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
export type DocDataSnap =
  firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
export type Timestamp = firebase.firestore.Timestamp
export type FireUser = firebase.User
export type UserCredential = firebase.UserInfo
export type UserCredential2 = firebase.auth.UserCredential
export type FireError = firebase.FirebaseError
