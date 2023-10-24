import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBnwkbxFYvnaeFV9w8V5rXpti9Jms8xpHg',
  authDomain: 'crwn-clothing-db-68a17.firebaseapp.com',
  projectId: 'crwn-clothing-db-68a17',
  storageBucket: 'crwn-clothing-db-68a17.appspot.com',
  messagingSenderId: '480615954468',
  appId: '1:480615954468:web:ab95d2be18e3529dea80b1',
}

const firebaseApp = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore(firebaseApp)

export const createUserFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot.exists())

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      })
    } catch (error) {
      console.log('create user doc error', error)
    }
  }

  return userDocRef
}

// const userState = () => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = onAuthStateChanged(
//       getAuth(),
//       (userFirebase) => {
//         unsubscribe()
//         resolve(userFirebase)
//       },
//       reject,
//     )
//   })
// }
// export { firebaseApp, db, userState }
