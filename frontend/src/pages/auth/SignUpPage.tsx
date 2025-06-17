import { registerUser } from "@/redux/slices/authSlice";
import type { AppDistpatch } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
  const dispatch=useDispatch<AppDistpatch>();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fullName.trim();
    email.trim();
    password.trim();
    if (fullName && email && password) {
      dispatch(registerUser({
        name:fullName,
        email,
        password
      })).then((res)=>{
        console.log("register dispatch response",res);
      })
    

    } else {
      // Handle error case
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-[100vh] w-full flex flex-col items-center justify-center ">
      <div className="bg-[var(--secondary-color)] shadow-2xl p-4 rounded-lg w-96  border-2 border-[var(--primary-color)]">
        <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 rounded border border-gray-300 focus:outline-none focus:border-[var(--primary-color)]"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFullName(e.target.value)
            }
            value={fullName}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded border border-gray-300 focus:outline-none focus:border-[var(--primary-color)]"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded border border-gray-300 focus:outline-none focus:border-[var(--primary-color)]"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            value={password}
          />
          <button
            type="submit"
            className="bg-[var(--primary-color)] text-white p-2 rounded hover:bg-[var(--primary-color-hover)] transition-colors"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an acount?{" "}
          <a href="/sign-in" className="text-[var(--primary-color)]">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
