import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, Links } from "react-router-dom";

const SignUp = () => {
  const [formdata, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    console.log(e.target.id, ":=", e.target.value);
    setFormData({ ...formdata, [e.target.id]: e.target.value.trim() });
  };
  console.log(formdata);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      if (!formdata?.username || !formdata?.password || !formdata?.email) {
        return setErrorMessage("all field are Required");
      }
      const signupResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      // Handle response
      if (!signupResponse.ok) {
        const errorData = await signupResponse.json();
        throw new Error(errorData.message || "Signup failed");
      }
      setLoading(false);
      const data = await signupResponse.json();
      console.log("Signup successful:", data);
      // Perform actions after successful signup (e.g., redirect, show success message)
    } catch (error) {
      console.log("error :=> ", error);
      setErrorMessage(error.message || "An unexpected error occurred");
      setLoading(false);
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
            This is demo project , You can signup with username and password or
            with Google
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Username" />
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="password"
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
                "Signup"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 ">
            <span>Have an Account?</span>
            <Link to="/signin" className="text-blue-500">
              SignIn
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

export default SignUp;
