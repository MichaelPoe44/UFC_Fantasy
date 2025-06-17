import {Routes, Route} from "react-router-dom"
import { StateProvider } from "./StateProvider.jsx"
import { useState } from "react"

//components
import Header from "./components/Header.jsx"
import Sidebar from "./components/Sidebar.jsx"

//pages
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import LeagueMenu from "./pages/LeagueMenu.jsx"
import Profile from "./pages/Profile.jsx"
import GetStarted from "./pages/GetStarted.jsx"

  // {showSidebar && (
  //           <Sidebar setShowSidebar={setShowSidebar}/>
  //         )}

function App() {

  const [showSidebar,setShowSidebar] = useState(false);

  return (
    <>
    <StateProvider>
      <Header setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
      {showSidebar && (
          <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar}/>
      )}

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/get-started" element={<GetStarted />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/league-menu" element={<LeagueMenu />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
    </StateProvider>
    </>
  )
}

export default App
