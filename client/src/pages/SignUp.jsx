import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link, Links } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className=" flex-1">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm sm:text-4xl font-bold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-500 rounded-lg text-white">
              Mind's
            </span>
            Thought
          </Link>
          <p className="text-sm mt-5">
            This is demo project , You can signup with username and password or with Google
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your Username"/>
              <TextInput type="text" placeholder="username" id="username"/>
            </div>
            <div>
              <Label value="Your Email"/>
              <TextInput type="email" placeholder="email" id="email"/>
            </div>
            <div>
              <Label value="Your Password"/>
              <TextInput type="password" placeholder="password" id="password"/>
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              SignUp
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 ">
           <span>Have an Account?</span>
           <Link to="/signin" className="text-blue-500"> 
            SignIn
           </Link> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
