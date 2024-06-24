import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function Login() {
  const {user,loginWithRedirect,isAuthenticated,logout}=useAuth0();
  console.log("Current user",user);


  return (
    <div className='h-screen w-full flex items-center justify-center'>
     {isAuthenticated ?(
      <button className='bg-blue px-8 py-2 text-white ' onClick={(e)=>logout()}>Logout</button>
     ):(
      <button className='bg-blue px-8 py-2 text-white' onClick={loginWithRedirect}>
      Login
            </button>
     )}

       
    </div>
  )
}

export default Login