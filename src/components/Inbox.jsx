import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailContext } from "./contextAPI";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../ReduxStore/Authenticate";

function Inbox(){
    const dispatch=useDispatch();
    // const MyContext=useContext(MailContext);
    const isEmail=useSelector((state)=>state.authReducer.isEmail)
    const isAuthenticate=useSelector((state)=>state.authReducer.isAuthenticate)
    const [arr,setArr]=useState([]);
    let normalArray=[]
    function handleLogOut(){
        localStorage.clear();
        // MyContext.setIsEmail(undefined)
        // MyContext.setIsAuthenticate(false);
        dispatch(authAction.changeEmailValue(undefined));
        dispatch(authAction.changeTokenValue(false));
    }
    
    useEffect(()=>{
        isAuthenticate;
    },[isEmail])
    useEffect(()=>{
      getInbox();
  },[isEmail])
  async function getInbox(){
  const res= await axios.get(`https://fir-db-7355f-default-rtdb.firebaseio.com/Inbox/${isEmail}.json`);
  const data=res.data;
  normalArray=[];
  for(let key in data){
  
      normalArray.push({id:key,...data[key]})
  }
  console.log(normalArray);
  setArr(normalArray);
  }

  
    return(
        <div classNameName="flex justify-center items-center p-20">
      <div className="grid grid-cols-12 h-full">
   
    <div className="h-[100vh] col-span-2 bg-blue-900 text-white p-4  items-center flex flex-col gap-4 ">
      <h2 className="text-xl font-semibold mb-4 flex gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="white" class="bi bi-mailbox" viewBox="0 0 16 16">
  <path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3m0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4m2.646 1A4 4 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3z"/>
  <path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0"/>
</svg>Mailbox</h2>
      
        <button className="py-2 px-4 rounded text-blue-700 bg-white cursor-pointer">Inbox</button>
        <Link to="/compose">
        <button className="py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">Compose</button>
        </Link>
        
        <Link to="/sent">
        <button className="py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">Sent</button>
        </Link>
        <button onClick={handleLogOut} className="py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">
            {isAuthenticate? "Log Out" : <Link to="/login"> Log In</Link> }</button>
        
      
    </div>

    <div className="col-span-8 bg-white p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      Messages unread: &nbsp;
      {
        arr.reduce((count,item)=>{
          return item.read===false?count+1:count;
        },0)
      }
      <div className="grid grid-cols-1 gap-4 mt-4">
    
        {
            arr.map((items)=>{
                return(
                  <Link to={`/inbox/${items.id}`}>
                    <div className="relative p-4 bg-gray-150 rounded-lg shadow hover:bg-gray-300 hover:border-4 cursor-pointer">
                    <h3 className="font-semibold text-lg">{items.subject}</h3>
                    
                    {
                      !items.read &&  <span className="absolute top-4 right-4  h-3 w-3 rounded-full bg-red-500" />
                      // :<span className="absolute top-4 right-4  h-3 w-3 rounded-full bg-red-500" />
                    }
                    <p className="text-gray-700 mt-2">From: {items.mail}</p>
                    <div className="flex justify-end gap-4">
                      <button className="bg-red-600 text-white rounded-full px-4 py-2">Delete</button>
                    </div>
                    </div>
                  </Link>
                )
            })
        }
     
      </div>
    </div>
  </div>
    </div>
    )
}

export default Inbox;