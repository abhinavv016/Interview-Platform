import { Route, Routes } from "react-router"

import HomePage from "./pages/HomePage"
import ProblemPage from "./pages/ProblemPage"
import { useUser } from "@clerk/clerk-react";

function App() {
  const { isSignedIn } = useUser();

  return (
    <>

      <Routes>
        <Route path= "/" element={<HomePage />}/>
        <Route path= "/problems" element={ isSignedIn ? <ProblemPage /> : <HomePage/>}/>
      </Routes>
    </>
  )
}

export default App
