import firebase from 'firebase';
import { Dispatch, SetStateAction } from 'react';

export interface Roompy {
  id?: string;
  age: number;
  budget: number;
  city: string;
  createdAt: number;
  desc: string;
  gender: string;
  name: string;
  occupation: string;
  phoneNumber: string;
  photoURL: string;
  postedBy: firebase.firestore.DocumentReference;
  updatedAt: number;
}

export interface User {
  createdAt: number;
  email: string;
  emailVerified: boolean;
  postedRoompies: firebase.firestore.DocumentReference[] | [];
  postedRooms: firebase.firestore.DocumentReference[] | [];
  username: string;
  updatedAt: number;
}

export interface UserContextState {
  user: AuthUser;
  setUser: firebase.User | Dispatch<SetStateAction<firebase.User>>;
}

export type Roompies = Roompy[];
export type Users = User[];
export type AuthUser = firebase.User | null;
