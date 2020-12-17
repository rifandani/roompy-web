import firebase from 'firebase';

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

export type Roompies = Roompy[];
