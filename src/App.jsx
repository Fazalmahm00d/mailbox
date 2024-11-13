import { Route, Routes } from "react-router-dom"
import Inbox from "./components/Inbox"
import Login from "./components/Login"
import Compose from "./components/Compose"
import Sent from "./components/Sent"
import { useContext } from "react"
import { MailContext } from "./components/contextAPI"
import Dynamic from "./components/Dynamic"
import Dynamic2 from "./components/Dynamic2"
import { useSelector } from "react-redux"

function App() {
 
  // const MyContext=useContext(MailContext);
  const isEmail=useSelector((state)=>state.authReducer.isEmail)
  return (
    <div>
      <Routes>
      <Route path="/" element={isEmail ? <Inbox /> : <Login />} />
      <Route path="/compose" element={isEmail ? <Compose /> : <Login />} />
      <Route path="/sent" element={isEmail ? <Sent /> : <Login />} />
      <Route path="/login" element={<Login/>}  />
      <Route path='/inbox/:id' element={<Dynamic/>}/>
      <Route path='/sent/:id' element={<Dynamic2/>}/>

      </Routes>
    </div>
  )
}

export default App
