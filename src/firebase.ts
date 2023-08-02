import { initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

export const firebaseApp = initializeApp({
  // fake config, only works with emulator
  apiKey: 'xxxxxxxxxxxxxxxxxxxxx_xxxxxxxxxxxx_xxxx',
  authDomain: 'my-project.firebaseapp.com',
  databaseURL: 'https://my-project.firebasedatabase.app',
  projectId: 'my-project',
  storageBucket: 'my-project.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:0000000000000000000000',
})

connectFirestoreEmulator(getFirestore(firebaseApp), 'localhost', 8081)
// add any other emulator here
