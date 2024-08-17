import { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Services/AuthProvider";
import toast from "react-hot-toast";
import upload from "../assets/uploadImg.png";
import { ImageUpload } from "../Utils/ImgUpload";

function SignUp() {
  // Update img functionality-------------------->
  const [avatarURL, setAvatarURL] = useState(upload);
  const [image, setImage] = useState(Object);
  console.log(image);

  const fileUploadRef = useRef();
  const handleUploadImg = (e) => {
    e.preventDefault();
    fileUploadRef.current.click();
  };
  const handleDisplayUploadedImg = () => {
    const uploadedFile = fileUploadRef.current.files[0];
    const cachedURL = URL.createObjectURL(uploadedFile);
    console.log(cachedURL, uploadedFile);
    setAvatarURL(cachedURL);
    setImage(uploadedFile);
  };

  const { createNewUser, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    const name = data?.name;
    const photo = await ImageUpload(image);
    const email = data?.email;
    const password = data?.password;
    createNewUser(email, password)
      .then((res) => {
        updateUserProfile(name, photo);
        if (res.user) {
          navigate("/");
          toast.success("Successfully SignUp!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 pt-28">
        <div className="mx-auto max-w-lg border-2 p-8 rounded-2xl bg-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            className="mb-0 mt-6 space-y-4 rounded-lg p-4"
          >
            <p className="text-center text-xl text-gray-900 font-medium">
              Sign Up to your account
            </p>
            <div className=" mt-4 flex justify-center">
              <button className="" onClick={handleUploadImg}>
                <img
                  className="w-24 rounded-full"
                  src={avatarURL}
                  alt="avatar"
                />
              </button>
              <input
                onChange={handleDisplayUploadedImg}
                ref={fileUploadRef}
                type="file"
                className="hidden"
              />
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>

              <div className="relative">
                <input
                  {...register("name", { required: true })}
                  name="name"
                  type="text"
                  className="w-full rounded-lg border outline-none focus:border-[#6c72ff] p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Fullname"
                />
              </div>
              <div className="relative mt-4">
                <input
                  {...register("email", { required: true })}
                  name="email"
                  type="email"
                  className="w-full rounded-lg border outline-none focus:border-[#6c72ff] p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  name="password"
                  type="password"
                  className="w-full rounded-lg border outline-none focus:border-[#6c72ff] p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-[#6C72FF] px-5 py-3 text-sm font-medium text-white"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have account?
              <Link
                to={"/signin"}
                className="underline font-bold text-[#6C72FF]"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
