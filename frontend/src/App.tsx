import { Navigate, Route, Routes } from "react-router"

import HomePage from "./pages/HomePage"
import { useUser } from "@clerk/clerk-react";
import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  if(!isLoaded) return null;

  return (
    <>

      <Routes>
        <Route path= "/" element={ !isSignedIn ? <HomePage/> : <Navigate to={"/dashboard"}/> }/>
        <Route path= "/problems" element={ isSignedIn ? <ProblemsPage /> : <Navigate to={"/"}/> }/>
        <Route path= "/dashboard" element={ isSignedIn ? <DashboardPage /> : <Navigate to={"/"}/> }/>
      </Routes>
    </>
  )
}

export default App
