import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
const Dashprofile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-full mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form action="" className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
            <img src={currentUser?.profilePicture} alt="user" className="w-full h-full rounded-full object-cover border-8 border-[lightgray]"/>
        </div>
          <TextInput defaultValue={currentUser?.username} id="username"  placeholder="username"/>
          <TextInput defaultValue={currentUser?.email} id="email" type="email" placeholder="email"/>
          <TextInput placeholder="password" id="password"  type="password"/>
          <Button gradientDuoTone="purpleToPink" type="submit" outline>Update</Button>
          <div className="text-red-500 mt-5 flex justify-between">
            <span className="cursor-pointer">Delete Account</span>
            <span className="cursor-pointer">Sign Out</span>
          </div>
      </form>
    </div>
  );
};

export default Dashprofile;
