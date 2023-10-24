import {
  signInWithGooglePopup,
  createUserFromAuth,
} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
  const loginGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    createUserFromAuth(user)
  }
  return (
    <div>
      <h1>sign in</h1>
      <button onClick={loginGoogleUser}>Sign in with Google</button>
    </div>
  )
}

export default SignIn
