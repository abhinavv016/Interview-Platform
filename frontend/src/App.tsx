import './App.css'
import { SignInButton } from '@clerk/react'

function App() {
  return(
    <>
      <h1>Welcome to the page</h1>
      <SignInButton mode='modal'/>
    </>
  )
}

export default App
