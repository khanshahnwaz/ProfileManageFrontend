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
const EditProfile = (props) => {
  const context = useContext(ProfileContext);

  // state to manage the error tooltip for every input box
  const [visiEmail, setViisiEmail] = useState(false);
  const [visiName, setVisiName] = useState(false);
  const [visiPhone, setVisiPhone] = useState(false);

  const { Name, Email, Phone } = props.data;

  // Formik library
  const formik = useFormik({
    initialValues: {
      name: Name,
      email: Email,
      phone: Phone,
    },
    enableReinitialize: true,
    validate: (values) => {
      console.log(formik.values);
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email";
      }
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.phone) {
        errors.phone = "Required";
      }else if(values.phone.toString().length>10 || values.phone.toString().length<10)
         errors.phone='Number should be 10 digit.'

      return errors;
    },
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        name: values.name,
        phone: values.phone,
      };
      // console.log("sent data",JSON.stringify(data))
      const response = await fetch(`${context.url}/user/editProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result.Message);
      if (result.status === 200) {
        context.setEditProfile(false);
      } else {
        context.setErrorMessage(result.Message);
      }
    },
  });

  useEffect(() => {
    if (formik.errors.email && formik.touched.email) {
      setViisiEmail(true);
    } else setViisiEmail(false);
    if (formik.errors.name && formik.touched.name) {
      setVisiName(true);
    } else setVisiName(false);
    if (formik.errors.phone && formik.touched.phone) {
      setVisiPhone(true);
    } else setVisiPhone(false);
  }, [formik]);
  if (context.editProfile) {
    return (
      <>
        {/* <!-- Overlay element --> */}
        <Error url="/home" />
        <Successful url="/home" />
        <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-900 bg-opacity-90"></div>

        <div
          id="container"
          className="flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 w-[90%] md:w-3/5 lg:w-2/5 "
        >
          <FiX
            className="float-right fixed -traslate-x-1/2 -translate-y-1/2 -right-1 -top-2 hover:opacity-10 cursor-pointer text-3xl text-white"
            onClick={() => context.setEditProfile(false)}
          />

          {/* right division */}
          <div className="bg-white h-full w-[100%] ">
            <div className=" md:p-10 sm:p-5 ">
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
                        className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full"
                        name="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      ></input>
                    </Tippy>
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="float-left text-blue-900 font-bold"
                    >
                      Name
                    </label>
                    <br />
                    <Tippy
                      visible={visiName}
                      content={formik.errors.name}
                      placement="top-end"
                    >
                      <input
                        type="text"
                        className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full"
                        name="name"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      ></input>
                    </Tippy>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="float-left text-blue-900 font-bold"
                    >
                      Phone
                    </label>
                    <br />
                    <Tippy
                      visible={visiPhone}
                      content={formik.errors.phone}
                      placement="top-end"
                    >
                      <input
                        type="text"
                        className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full"
                        name="phone"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                      ></input>
                    </Tippy>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 font-bold float-left cursor-pointer bg-blue-900 text-white py-2 px-5 rounded "
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  } else return null;
};

export default EditProfile;
