import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react"

function HomePage() {
  return <div>
      
    <button className="btn btn-secondary">Click me</button>
 
      <SignedOut>
        <SignInButton mode="modal">
          <button className="btn btn-primary">Login</button>
        </SignInButton>
      </SignedOut>
      
      <SignedIn>
        <SignOutButton/>
      </SignedIn>

      <UserButton/>
    </div>

}

export default HomePage