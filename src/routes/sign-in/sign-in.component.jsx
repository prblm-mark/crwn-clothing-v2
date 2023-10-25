import {
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserRecord,
  auth,
} from '../../utils/firebase/firebase.utils'
import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import SignUpForm from '../../components/sign-up/sign-up-form.component'

const SignIn = () => {
  useEffect(() => {
    async function getRedirect() {
      const response = await getRedirectResult(auth)
      if (response) {
        createUserRecord(response.user)
      }
    }
    getRedirect()
  }, [])

  const loginGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    createUserRecord(user)
  }

  return (
    <div>
      <h1>sign in</h1>
      <button onClick={loginGoogleUser}>Sign in with Google</button>
      <button onClick={signInWithGoogleRedirect}>Sign in on Google</button>

      <SignUpForm/>
    </div>
  )
}

export default SignIn
