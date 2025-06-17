import { useState} from "react"
import { useDispatch } from "react-redux";
import type {AppDistpatch} from '../../redux/store'
import { loginUser } from "@/redux/slices/authSlice";

export const SignInPage = () => {
  const dispatch=useDispatch<AppDistpatch>();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
 
     
     email.trim();
     password.trim();
     if (email && password) {
    
      dispatch(loginUser({
        email,
        password
      })).then((res)=>{
        console.log("User login dispatch response : ",res);
      })

     } else {
       // Handle error case
       alert("Please fill in all fields.");
     }
   };
 
  return (
    <div className='min-h-[100vh] w-full flex flex-col items-center justify-center '>

      <div className="bg-[var(--secondary-color)] shadow-2xl p-4 rounded-lg w-96  border-2 border-[var(--primary-color)]">
        <h1 className='text-2xl font-bold text-center mb-4'>Sign In</h1>
        <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
          <input
            type="email"
            placeholder="Email"
            className='p-2 rounded border border-gray-300 focus:outline-none focus:border-[var(--primary-color)]'
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className='p-2 rounded border border-gray-300 focus:outline-none focus:border-[var(--primary-color)]'
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
            value={password}
          />
          <button
            type="submit"
            className='bg-[var(--primary-color)] text-white p-2 rounded hover:bg-[var(--primary-color-hover)] transition-colors'
          >
            Sign In
          </button>
        </form>
        <p className='text-center mt-4'>
          Don't have an account? <a href="/sign-up" className='text-[var(--primary-color)]'>Sign Up</a>
        </p>


      </div>


    </div>
  )
}
