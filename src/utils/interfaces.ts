import firebase from 'firebase';
import { Dispatch, SetStateAction } from 'react';

export interface HomePref {
  room: string;
  parking: string;
  wifi: string;
  bathroom: string;
}

export interface RoompiesPref {
  gender: string;
  ageFrom: number;
  ageTo: number;
  smoker: string;
  pet: string;
}

export interface Roompy {
  id?: string;
  age: number;
  budget: number;
  createdAt: number;
  desc: string;
  gender: string;
  homePref: HomePref;
  isSmoker: boolean;
  locPref: string[];
  moveDate: number;
  name: string;
  occupation: string;
  ownPet: boolean;
  phoneNumber: string;
  photoURL: string;
  postedBy: string; // awalnya DocRef
  roompiesPref: RoompiesPref;
  stayLength: number;
  updatedAt: number;
}

export interface RoompiesProps {
  roompies: Roompies | [];
}

export interface User {
  createdAt: number;
  email: string;
  favorites: string[];
  isPremium: boolean;
  postedRoompies: string[] | []; // awalnya DocRef
  postedRooms: string[] | []; // awalnya DocRef
  premiumUntil: number;
  updatedAt: number;
  username: string;
}

export interface UserContextState {
  user: AuthUser;
  setUser: firebase.User | Dispatch<SetStateAction<firebase.User>>;
}

export interface Postal {
  urban: string;
  sub_district: string;
  city: string;
  province_code: string;
  postal_code: string;
}

export type Roompies = Roompy[];
export type Users = User[];
export type AuthUser = firebase.User | null;
export type Postals = Postal[];

// firebase type
export type DocRef = firebase.firestore.DocumentReference;
export type Timestamp = firebase.firestore.Timestamp;
