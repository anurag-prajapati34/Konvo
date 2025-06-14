import { useState} from "react"


export const SignInPage = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
 
     
     email.trim();
     password.trim();
     if (email && password) {
       //call the function to handle user singin
       handleUserSignIn();
     } else {
       // Handle error case
       alert("Please fill in all fields.");
     }
   };
 
   const handleUserSignIn= () => {
     // This function can be used to handle user signin logic, such as making an API call to register the user.
     // For now, it just logs the user data to the console.
     console.log({  email, password });
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
