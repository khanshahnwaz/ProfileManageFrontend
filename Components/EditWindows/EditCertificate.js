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
import { useRouter } from "next/router";
import { FiX } from "react-icons/fi";
const EditCertificate = (props) => {
  const context = useContext(ProfileContext);
  const { certificates } = props;
  const router = useRouter();

  // state to manage the error tooltip for every input box

  // Formik library
  const formik = useFormik({
    initialValues: {
      certificateName: "",
      platform: "",
    },
    onSubmit: async (values) => {
      const data = [
        { Name: values.certificateName, Platform: values.platform },
        ...certificates,
      ];
      console.log(data);
      console.log("sent data", JSON.stringify(data));
      const response = await fetch(
        `${context.url}/certificates/editCertificate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(result.Message, "and data is", result.data);
      if (result.status === 201) {
        console.log("New certificate added. ");
        context.setEditCertificate(false);
      } else {
        context.setErrorMessage(result.Message);
      }
    },
  });

  if (context.editCertificate) {
    return (
      <>
        {/* <!-- Overlay element --> */}
        <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-900 bg-opacity-90"></div>

        <div
          id="container"
          className="flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 w-[90%] md:w-3/5 lg:w-2/5 "
        >
          <FiX
            className="float-right fixed -traslate-x-1/2 -translate-y-1/2 -right-1 -top-2 hover:opacity-10 cursor-pointer text-3xl text-white"
            onClick={() => context.setEditCertificate(false)}
          />

          {/* right division */}
          <div className="bg-white h-full w-[100%] ">
            <div className=" md:pb-10 sm:p-5 ">
              {/* Form section  */}

              <form onSubmit={formik.handleSubmit}>
                <div className="">
                  <div>
                    <label
                      htmlFor="certificateName"
                      className="float-left text-blue-900 font-bold"
                    >
                      Certificate Name
                    </label>
                    <br />
                    <input
                      type="text"
                      className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full h-full"
                      name="certificateName"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.certificateName}
                    ></input>
                  </div>

                  <div>
                    <label
                      htmlFor="Platform"
                      className="float-left text-blue-900 font-bold"
                    >
                      Platform
                    </label>
                    <br />
                    <input
                      type="text"
                      className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full h-full"
                      name="platform"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.platform}
                    ></input>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 font-bold float-left cursor-pointer bg-blue-900 text-white py-2 px-5 rounded "
                >
                  Submit
                </button>
                {/* Forgot name section */}
                {/* <p className='mb-2 text-sm tracking-wide text-left font-semibold text-blue-900 cursor-pointer hover:opacity-50'>Forgot your name?</p> */}
              </form>
            </div>
          </div>
        </div>
      </>
    );
  } else return null;
};

export default EditCertificate;
