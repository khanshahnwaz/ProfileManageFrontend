// import { Link,useNavigate } from "react-router-dom";
// import remove   from '../Assets/remove.png'
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
// import { PublicationContext } from "../../Context/PublicationState";
import Error from "../Modals/Error";
import Successful from "../Modals/Successful";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ProfileContext } from "@/Context/ProfileState";
const Login = (props) => {
  const context = useContext(ProfileContext);

  // state to manage the error tooltip for every input box
  const [visiEmail, setViisiEmail] = useState(false);
  const [visiPassword, setVisiPassword] = useState(false);

  // Formik library
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email";
      }
      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const data = {
        Email: values.email,

        Password: values.password,
      };
      // console.log("sent data",JSON.stringify(data))
      const response = await fetch(`${context.url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result.Message);
      // result.status===200?localStorage.setItem({token:result.token}):null
      if (result.status === 200) {
        localStorage.setItem("token", result.token);
        // context.setSuccessMessage(result.Message);
        // localStorage.setItem("data", JSON.stringify(result.data));
      } else {
        context.setErrorMessage(result.Message);
      }
      // navigateToHome();
    },
  });

  useEffect(() => {
    if (formik.errors.email && formik.touched.email) {
      setViisiEmail(true);
    } else setViisiEmail(false);
    if (formik.errors.password && formik.touched.password) {
      setVisiPassword(true);
    } else setVisiPassword(false);
  }, [formik]);
  return (
    <>
      {/* <!-- Overlay element --> */}
      <Error url="/" />
      <Successful url="/home" />
      <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-900 bg-opacity-90"></div>

      <div
        id="container"
        className="flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 md:w-[50%] w-[92%] "
      >
    
        {/* left division */}
        <div className="h-max bg-gradient-to-b from-blue-900 to-blue-700  border-white rounded-lg shadow-lg w-[350px] hidden lg:block ">
          <p className="text-left text-base font-bold text-white pl-10 mt-4">
            Profile_Manager
          </p>
          <p className="text-4xl tracking-wider text-left mt-10 p-10 text-white font-bold">
            Resume your <br /> journey with us
          </p>
          <p className="text-sm mt-2 text-left px-10 text-gray-200">
            Discover world best community of freelancers and business owners.
          </p>
          <div className=" mt-44  py-5 px-5 pb-4 mx-10 bg-blue-950 text-base font-bold  text-left text-gray-200 h-32 rounded-lg shadow-lg">
            Simply unbelievable! I am absolutely satisfied with my business.
            This is absolutely wonderful.
          </div>
        </div>
        {/* right division */}
        <div className="bg-white h-full w-[100%] lg:w-[50%] ">
          <div className="mt-5 p-5 md:p-10 mb-0">
            <p className="text-left text-4xl font-bold tracking-wide text-blue-900">
              Login
            </p>
            <p className="mt-2 text-sm tracking-wide text-left font-semibold">
              Don&apos;t have an account?
              <span
                className="text-blue-900 cursor-pointer"
                onClick={() => {
                  [props.setSignIn(false), props.setSignUp(true)];
                }}
              >
                Register
              </span>
            </p>
          </div>
          <div className="-mt-8 md:p-10 p-5 ">
            {/* Form section  */}

            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="float-left text-blue-900 font-bold"
                  >
                    Email
                  </label>
                  <br />
                  <Tippy
                    visible={visiEmail}
                    content={formik.errors.email}
                    placement="top-end"
                  >
                    <input
                      type="text"
                      className="border-2 border-blue-900 rounded-lg float-left mt-1 py-2 w-full"
                      name="email"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    ></input>
                  </Tippy>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="float-left text-blue-900 font-bold"
                  >
                    Password
                  </label>
                  <br />
                  <Tippy
                    visible={visiPassword}
                    content={formik.errors.password}
                    placement="top-end"
                  >
                    <input
                      type="text"
                      className="border-2 border-blue-900 rounded-lg float-left mt-1 py-2 w-full"
                      name="password"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    ></input>
                  </Tippy>
                </div>
              </div>

              <button
                type="submit"
                className=" my-2 font-bold float-left cursor-pointer bg-blue-900 text-white py-2 px-5 rounded "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
