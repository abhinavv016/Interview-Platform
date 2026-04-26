import { SignedIn, SignOutButton } from "@clerk/clerk-react"

function DashboardPage() {
  return (
    <>
      <SignedIn>
        <SignOutButton/>
      </SignedIn>
    </>
  )
}

export default DashboardPage