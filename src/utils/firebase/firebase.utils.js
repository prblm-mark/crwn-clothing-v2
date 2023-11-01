import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
export const db = getFirestore(firebaseApp)
export const auth = getAuth()

// Google auth provider & methods
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
})
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider)

// Create user from google auth
export const createUserRecord = async (userAuth, additionalData) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('create user doc error', error)
    }
  }

  return userDocRef
}

// Create user with email & password
export const createUser = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

// Create user with email & password
export const signInUser = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

// Sign out user
export const signOutUser = async () => await signOut(auth)

// Auth state change
export const userStateChanged = (callback) => onAuthStateChanged(auth, callback)
