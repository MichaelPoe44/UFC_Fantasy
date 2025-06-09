import {Routes, Route} from "react-router-dom"
import Header from "./components/Header.jsx"
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import Profile from "./pages/Profile.jsx"
import GetStarted from "./pages/GetStarted.jsx"
import './App.css'
import { useState } from "react"

function App() {

  const [team, change_team] = useState([]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/get-started" element={<GetStarted team={team} change_team={change_team}/>}/>
        <Route path="/profile" element={<Profile team={team} change_team={change_team}/>}/>
        <Route path="/about" element={<About />}/>
      </Routes>
    </>
  )
}

export default App
