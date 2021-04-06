import firebase from 'firebase'
import { Dispatch, SetStateAction } from 'react'

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
  locPref: string[]
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
  roompy: Roompy | null
}

export interface RoompiesProps {
  roompies: Roompies | []
}

export interface User {
  id?: string
  createdAt: number
  email: string
  favorites: Favorites
  messagesFrom: string[]
  messagesTo: string[]
  postedRoompies: string[] | [] // awalnya DocRef
  postedRooms: string[] | [] // awalnya DocRef
  premium: boolean
  premiumUntil: number
  token: string
  updatedAt: number
  username: string
}

export interface UserContextState {
  user: FireUser | null
  setUser: firebase.User | Dispatch<SetStateAction<firebase.User>>
}

export interface Postal {
  urban: string
  sub_district: string
  city: string
  province_code: string
  postal_code: string
}

export interface PhotoURL {
  lastModified: number
  lastModifiedDate: Date
  name: string
  path: string
  preview?: string // hasil URL.createObjectURL(image)
  size: number
  type: string
  webkitRelativePath: string
}

export type Roompies = Roompy[]
export type Users = User[]
export type Postals = Postal[]
export type PhotoURLs = PhotoURL[]

// firebase type
export type DocRef = firebase.firestore.DocumentReference
export type Timestamp = firebase.firestore.Timestamp
export type FireUser = firebase.User
export type UserCredential = firebase.UserInfo
export type UserCredential2 = firebase.auth.UserCredential
export type FireError = firebase.FirebaseError
