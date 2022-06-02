import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

export default function LoginView() {
  const { signInWithGoogle } = useContext(AuthContext)
  
  const navigate = useNavigate()

  const login = async () => {
    const rpta = await signInWithGoogle()
    if(rpta.user.uid){
      navigate('/')
    }
  }

  return (
      <div className='text-center'>
        <h4 className='mb-4'> Welcome, please login to start your session</h4>
        <button className='btn btn-danger btn-lg' onClick={login}>
          Login
        </button>
      </div>
  )
}


