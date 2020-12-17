import firebase from 'firebase';

export interface Roompy {
  id?: string;
  age: number;
  createdAt: number;
  desc: string;
  gender: string;
  photoURL: string;
  postedBy: firebase.firestore.DocumentReference;
  updatedAt: number;
}

export type Roompies = Roompy[];
