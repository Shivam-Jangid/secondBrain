import { useRef } from "react";
import { Button } from "../Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import LabelledInput from "../labelledInput";

export default function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  async function signup (){
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const username = usernameRef.current?.value;
    const res = await axios.post(BACKEND_URL+"/api/v1/signup", {
      email, username, password
    })
    if(res.status == 200) {
      alert('redirecting to signin page');
      navigate('/signin');
    }
    else if(res.status == 404){
      alert('space should not be present in username');
    }
    else{
      alert("user already exists with this username or email");
    }
  }
  return (
    <div className="min-h-screen font-roboto bg-black/90 flex justify-center items-center">    
    <div className="min-w-md flex flex-col bg-black rounded-2xl border border-gray-100/20 shadow-2xl py-4 px-8">
        <div className="text-3xl font-semibold text-white/90 flex justify-center mt-2 mb-3">
            Sign Up
       </div>
        <LabelledInput title="Email" reference={emailRef} type="email"/>
        <LabelledInput title="Username" reference={usernameRef} type="text"/>
        <LabelledInput title="Password" type="password" reference={passwordRef} />
        <div className="w-full">
        <Button text="Submit" variants="light" onClick={signup} width="full" />
        <div className="flex items-center justify-center mt-2" >
          <div className="text-slate-100/80 mr-2">Already a user ? </div>
          <button className="text-purple-100 cursor-pointer hover:underline hover:text-purple-400 transition-all" onClick={()=>{
            navigate('/signin')
          }}>Signin</button>
        </div>
        </div>
    </div> 
    </div>
  )
}
