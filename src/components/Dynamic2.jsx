
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MailContext } from "./contextAPI";
import { useSelector } from "react-redux";


function Dynamic2(){
    const result=useParams();
    const [arr,setArr]=useState([]);
    // const MyContext=useContext(MailContext)
    const isEmail=useSelector((state)=>state.authReducer.isEmail)
    let filtereddata=[]
    async function getInbox(){
        const res= await axios.get(`https://fir-db-7355f-default-rtdb.firebaseio.com/Sent/${isEmail}.json`);
        
        const data=res.data;
        const normalArray=[];
        for(let key in data){
            normalArray.push({id:key,...data[key]})
        }
        filtereddata=normalArray.find((item)=>(item.id===result.id))
        setArr(filtereddata);
        }
        useEffect(()=>{
            getInbox();   
        },[])   
    return(
        <div className="flex flex-col justify-center items-center  h-[100vh]">
            <div className="w-[50%]">
            <div className="font-2xl font-bold uppercase">Subject: {arr.subject}</div>
            <div className="font-l font-light ">From: {arr.mail}</div>
            <div className="flex justify-center   font-bold  items-center shadow-xl rounded-md border-2 border-gray-300 p-4 ">
            {arr.message}
            </div>
            </div>
        </div>
    )
}

export default Dynamic2;
