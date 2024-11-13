import { useContext } from "react";
import { Link } from "react-router-dom";
import { MailContext } from "./contextAPI";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../ReduxStore/Authenticate";

function Compose(){
    const MyContext=useContext(MailContext);
    const dispatch=useDispatch();
    const isEmail=useSelector((state)=>state.authReducer.isEmail);
    const isAuthenticate=useSelector((state)=>state.authReducer.isAuthenticate);
    async function handleSubmit(e){
        e.preventDefault();
        const mail = e.target.mail.value.replace(/[@.]/g, "");
        console.log('message sent to this email:',mail)
        const subject=e.target.subject.value;
        const message=e.target.message.value;
        const newMail={
            mail:mail,
            subject:subject,
            message:message,
            read:false,
        }
        await axios.post(`https://fir-db-7355f-default-rtdb.firebaseio.com/Inbox/${mail}.json`,newMail);
        await axios.post(`https://fir-db-7355f-default-rtdb.firebaseio.com/Sent/${isEmail}.json`,newMail)
    }
    function handleLogOut(){
        localStorage.clear();
        // MyContext.setIsEmail(undefined)
        // MyContext.setIsAuthenticate(false)
        dispatch(authAction.changeEmailValue(undefined));
        dispatch(authAction.changeTokenValue(false))
    }

    return(
        <div classNameName="flex justify-center items-center p-20">
        <div className="grid grid-cols-12 h-full">
     
      <div className="col-span-2 bg-blue-900 text-white p-4 flex flex-col items-center gap-4 ">
      <h2 className="text-xl font-semibold mb-4 flex gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="white" class="bi bi-mailbox" viewBox="0 0 16 16">
  <path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3m0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4m2.646 1A4 4 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3z"/>
  <path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0"/>
</svg>Mailbox</h2>
        
        <Link to="/">
        <button className="py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">Inbox</button>
        </Link>
          <button className="py-2 px-4 rounded text-blue-700 bg-white cursor-pointer">Compose</button>
          <Link to="/sent">
        <button className="py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">Sent</button>
        </Link>
          <button onClick={handleLogOut} className="py-2 px-4 rounded hover:bg-blue-700 cursor-pointer">
            {isAuthenticate? "Log Out" : <Link to="/login"> Log In</Link> }</button>
        
      </div>
  
      <div className="col-span-8 bg-white p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Compose</h1>
     
        <div className="grid grid-cols-1 gap-4">
            <form onSubmit={handleSubmit}>
            <div className="flex mt-4">
            <label htmlFor="to">To:</label>
            <input name="mail" className="w-full border-2 ml-14" id="to" type="text" placeholder=""/>
            </div>
           <div className="flex mt-4">
           <label htmlFor="sub">Subject:</label>
           <input name="subject" className="w-full border-2 ml-6" id="sub" type="text" placeholder=""/>
           </div>
            <textarea name="message" className="mt-4 w-full border-2 border-gray-600 rounded h-[16rem]"  id="msg">
                
            </textarea>
            <button type="submit" className="bg-blue-700 px-4 py-2 rounded-2xl  text-white">Send</button>
            </form>
        </div>
      </div>
    </div>
      </div>
    )
}

export default Compose;