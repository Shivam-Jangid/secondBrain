import { useRef, useState } from "react";
import { Button } from "../Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import LabelledInput from "../labelledInput";
export default function Signin() {
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading , setLoading] = useState(false);
  async function signin (){
    setLoading(true);
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;
    try{
        const res = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        email, 
        password
    })
    setLoading(false);
    if (res.status == 200){
    console.log("signed in completely");
    const jwtToken = res.data.token;
    localStorage.setItem("token", jwtToken);
    navigate('/dashboard');
    }
    else {
      alert("invalid username or short password");
      setLoading(false);
    }
    }
    catch(err){
      alert('invalid username or password');
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen font-roboto bg-black/90 flex justify-center z-10 items-center">   
    {loading === true ? <div className="z-40 animate-bounce">
        <div className="bg-black py-2 rounded-2xl px-5 text-white">Loading ... </div>
      </div> : <div className="min-w-md z-20 flex flex-col bg-black rounded-2xl border border-gray-100/20 shadow-2xl py-4 px-8">
        <div className="text-3xl font-semibold text-white/90 flex justify-center mt-2 mb-3">
            Sign In
        </div>
        <LabelledInput type="email" title="Email" reference={emailRef} />
        <LabelledInput title="Password" type="password" reference={passwordRef} />
        <div className="w-full">
        <Button text="Submit" loading = {loading} variants="light" onClick={signin} width="full" />
        <div className="flex items-center justify-center mt-2" >
          <div className="text-slate-100/80 mr-2">New User ? </div>
          <button className="text-purple-100 cursor-pointer hover:underline hover:text-purple-400 transition-all" onClick={()=>{
            navigate('/signup');
          }}>Sign up</button>
        </div>
        </div>
    </div>} 
    </div>
  )
}
