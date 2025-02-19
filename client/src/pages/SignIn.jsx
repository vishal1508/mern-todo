import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth.jsx";
const SignIn = () => {
  const [formdata, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      if (!formdata?.password || !formdata?.email) {
        dispatch(signInFailure("Please fill all the fields"));
      }

      const signupResponse = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await signupResponse.json();
      // Handle response
      if (data.success === false) {
        console.log(data);
        dispatch(signInFailure(data.message));
      }

      if (signupResponse.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }

      // Perform actions after successful signup (e.g., redirect, show success message)
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

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
            This is demo project , You can signin with username and password or
            with Google
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="user@ddf.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="***********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span>...Loading</span>
                </>
              ) : (
                "SignIn"
              )}
            </Button>
          </form>
          <OAuth />
          <div className="flex gap-2 text-sm mt-5 ">
            <span>Create an Account?</span>
            <Link to="/signup" className="text-blue-500">
              SignUp
            </Link>
          </div>
          {errorMessage && (
            <div className="mt-5">
              <Alert color="failure">{errorMessage}</Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
