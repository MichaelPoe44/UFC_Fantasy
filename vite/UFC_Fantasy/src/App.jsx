import {Routes, Route} from "react-router-dom"
import Header from "./components/Header.jsx"
import Home from "./pages/Home.jsx"
import Profile from "./pages/Profile.jsx"
import GetStarted from "./pages/GetStarted.jsx"
import { StateProvider } from "./StateProvider.jsx"
import LeagueMenu from "./pages/LeagueMenu.jsx"
import Login from "./pages/Login.jsx"

function App() {

  return (
    <>
    <StateProvider>
        <Header />
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
