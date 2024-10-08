import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../Services/AuthProvider";
import toast from "react-hot-toast";

function SignIn() {
  // Email and password Sign in------------------------->
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const email = data?.email;
    const password = data?.password;
    signInUser(email, password).then((res) => {
      console.log(res.user);
      if (res.user) {
        toast.success("Successfully Sign In!");
        navigate("/");
      }
    });
  };

  // Google Sign in -------------------------->
  const handleGoogleSignIn = () => {
    signInWithGoogle();
    navigate("/");
    toast.success("Successfully Sign In!");
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 pt-36">
        <div className="mx-auto max-w-lg border-2 rounded-2xl p-8 bg-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            className="mb-0 mt-6 space-y-4 rounded-lg "
          >
            <p className="text-center text-xl font-medium">
              Sign in to your account
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
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
              Sign in
            </button>

            <p className="text-center text-sm text-gray-500">
              No account?
              <Link
                to={"/signup"}
                className="underline text-[#6C72FF] font-bold"
                href="#"
              >
                Sign up
              </Link>
            </p>
          </form>
          <div className="divider my-6">Or</div>
          <div className="">
            <button
              onClick={handleGoogleSignIn}
              type="submit"
              className=" w-full flex  items-center  justify-center gap-2 rounded-lg  px-5 py-3 text-sm font-medium text-gray-800 bg-gray-100"
            >
              <FcGoogle className="text-2xl" /> Sign in With Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
