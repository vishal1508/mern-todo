import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../utils/supabase";
const Dashprofile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [imageError, setImageError] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const imagefileRef = useRef();
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setImageError("File size exceeds 2 MB.");
      setImageFile(null);
      return;
    }

    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage(imageFile);
    }
  }, [imageFile]);
  const uploadImage = async (imageFile) => {
    const filename = new Date().getTime() + imageFile.name;
    try {
        
      const { data, error: uploadError } = await supabase.storage
        .from("mern-todo")
        .upload(filename, imageFile, {
          cacheControl: "3600",
          upsert: false
        });
        
      if (uploadError) {
        setImageError(uploadError)
        throw uploadError;
      }

      // Retrieve public URL
      //   console.log("filename :=> ",filename);
      const imageResponse = supabase.storage
        .from("mern-todo")// Replace with your bucket name
        .getPublicUrl(filename.trim()); // Exact file name

      setImageUrl(imageResponse.data.publicUrl);
      setUploadProgress(0);
      setImageFile(null);
      setImageError(null)
    } catch (err) {
      setImageError(err.message);
      setUploadProgress(0);
    }
  };
  return (
    <div className="max-w-full mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form action="" className="flex flex-col gap-4">
        {/* <FileInput id="image-upload" placeholder="upload image"/> */}
        <input
          type="file"
          accept="image/*"
          ref={imagefileRef}
          onChange={handleImage}
          hidden
        />

        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => imagefileRef.current.click()}
        >
          <img
            src={imageError ? currentUser?.profilePicture : imageUrl }
            alt="user"
            className="w-full h-full rounded-full object-cover border-8 border-[lightgray]"
          />
        </div>
        {imageError && <Alert color="red">{imageError}</Alert>}
        <TextInput
          defaultValue={currentUser?.username}
          id="username"
          placeholder="username"
        />
        <TextInput
          defaultValue={currentUser?.email}
          id="email"
          type="email"
          placeholder="email"
        />
        <TextInput placeholder="password" id="password" type="password" />
        <Button gradientDuoTone="purpleToPink" type="submit" outline>
          Update
        </Button>
        <div className="text-red-500 mt-5 flex justify-between">
          <span className="cursor-pointer">Delete Account</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
};

export default Dashprofile;
