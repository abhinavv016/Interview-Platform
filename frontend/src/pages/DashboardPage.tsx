import { SignedIn, SignOutButton } from "@clerk/clerk-react"
import Navbar from "../component/navbar"

function DashboardPage() {
  return (
    <>
    <Navbar/>
      <SignedIn>
        <SignOutButton/>
      </SignedIn>
    </>
  )
}

export default DashboardPage