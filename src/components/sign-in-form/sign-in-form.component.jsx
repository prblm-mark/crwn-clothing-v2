import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { useState, useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import {
  auth,
  createUserRecord,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  signInUser,
} from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  // Set initial state
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  // Use effect for sign in with google redirect
  useEffect(() => {
    async function getRedirect() {
      const response = await getRedirectResult(auth)
      if (response) {
        createUserRecord(response.user)
      }
    }
    getRedirect()
  }, [])

  // Sign in with Google Pop up
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup()
    createUserRecord(user)
  }

  // Handle change event on inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  // Handle submit event on the form
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Sign in user with email
    try {
      const { user } = await signInUser(email, password)
      if (user) {
        const { email, uid } = user
        console.log(email, uid)
      }

      // Reset Form
      setFormFields(defaultFormFields)
    } catch (error) {
      switch(error.code){
        case 'auth/wrong-password':
            alert('Wrong password for user')
            break
        case 'auth/user-not-found':
        alert('User not found with this email')
        break
        default:
            alert('Mmm there seems to be a problem')
      }
    }
  }
  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: 'email',
            required: true,
            onChange: handleChange,
            name: 'email',
            value: email,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: 'password',
            required: true,
            onChange: handleChange,
            name: 'password',
            value: password,
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type='button' onClick={signInWithGoogle} buttonType="google">
            Sign In with Google
          </Button>
          <Button type='button' onClick={signInWithGoogleRedirect} buttonType="inverted">
            Sign In On Google
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
