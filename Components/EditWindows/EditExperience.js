// import { Link,useNavigate } from "react-router-dom";
// import remove   from '../Assets/remove.png'
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
// import { PublicationContext } from "../../Context/PublicationState";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { ProfileContext } from "@/Context/ProfileState";
import { useRouter } from "next/router";
import { FiX } from "react-icons/fi";
const EditExperience = (props) => {
  const context = useContext(ProfileContext);
  const [visiExperienceYear, setVisiExperienceYear] = useState(false);
  const [visiFromyear, setVisiFromyear] = useState(false);
  const [visiToYear, setVisiToYear] = useState(false);
  const [visiRole, setVisiRole] = useState(false);
  const [visiType, setVisiType] = useState(false);
  const [visiCompanyName, setVisiCompanyName] = useState(false);
  const router = useRouter();

  // state to manage the error tooltip for every input box

  // Formik library
  const formik = useFormik({
    initialValues: {
      ExperienceYear: "",
      FromYear: "",
      ToYear: "",
      Type: "",
      Role: "",
      CompanyName: "",
    },
    enableReinitialize: true,
    validate: (values) => {
      const errors = {};
      if (!values.ExperienceYear) errors.ExperienceYear = "Required";
      else if (values.ExperienceYear <= 0)
        errors.ExperienceYear = "Invalid years of experience";
      if (!values.FromYear) errors.FromYear = "Required";

      if (!values.ToYear) errors.ToYear = "Required";
      else if (values.ToYear - values.FromYear != values.ExperienceYear)
        errors.ExperienceYear = "Incorrect years of experience";
      else if (values.ToYear > new Date().getFullYear())
        errors.ToYear = "Invalid year";
      if (!values.Type) errors.Type = "Required";
      if (!values.CompanyName) errors.CompanyName = "Required";
      if (!values.Role) errors.Role = "Required";

      return errors;
    },
    onSubmit: async (values) => {
      console.log("submitted");

      console.log("sent data", JSON.stringify(values));
      const response = await fetch(
        `${context.url}/experiences/createExperience`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(values),
        }
      );
      const result = await response.json();
      console.log(result.Message, "and data is", result.data);
      if (result.status === 201) {
        console.log("New experience added. ");
        context.setEditExperience(false);
      } else {
        context.setErrorMessage(result.Message);
      }
    },
  });

  useEffect(() => {
    if (formik.errors.ExperienceYear && formik.touched.ExperienceYear)
      setVisiExperienceYear(true);
    else setVisiExperienceYear(false);
    if (formik.errors.FromYear && formik.touched.FromYear)
      setVisiFromyear(true);
    else setVisiFromyear(false);
    if (formik.errors.ToYear && formik.touched.ToYear) setVisiToYear(true);
    else setVisiToYear(false);
    if (formik.errors.CompanyName && formik.touched.CompanyName)
      setVisiCompanyName(true);
    else setVisiCompanyName(false);
    if (formik.errors.Role && formik.touched.Role) setVisiRole(true);
    else setVisiRole(false);
    if (formik.errors.Type && formik.touched.Type) setVisiType(true);
    else setVisiType(false);
  }, [formik]);
  if (context.editExperience) {
    return (
      <>
        {/* <!-- Overlay element --> */}
        <div className="fixed  z-30 w-screen h-screen inset-0 bg-gray-900 bg-opacity-90"></div>

        <div
          id="container"
          className="flex fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40  bg-white rounded-lg shadow-2xl p-10 md:w-3/5 lg:w-2/5 "
        >
          <FiX
            className="float-right fixed -traslate-x-1/2 -translate-y-1/2 -right-1 -top-2 hover:opacity-10 cursor-pointer text-3xl text-white"
            onClick={() => context.setEditExperience(false)}
          />

          {/* right division */}
          <div className="bg-white h-full w-[100%] ">
            <div className=" md:pb-10 p-5 ">
              {/* Form section  */}

              <form onSubmit={formik.handleSubmit}>
                <div className="">
                  <div>
                    <label
                      htmlFor="experienceName"
                      className="float-left text-blue-900 font-bold"
                    >
                      Years of Experience
                    </label>
                    <br />
                    <Tippy
                      visible={visiExperienceYear}
                      content={formik.errors.ExperienceYear}
                      placement="top-end"
                    >
                      <input
                        type="number"
                        placeholder="5"
                        className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full h-full"
                        name="ExperienceYear"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.ExperienceYear}
                      ></input>
                    </Tippy>
                  </div>

                  <div>
                    <label
                      htmlFor="CompanyName"
                      className="float-left text-blue-900 font-bold"
                    >
                      Company Name
                    </label>
                    <br />
                    <Tippy
                      visible={visiCompanyName}
                      content={formik.errors.CompanyName}
                      placement="top-end"
                    >
                      <input
                        type="text"
                        placeholder="xyz"
                        className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full h-full"
                        name="CompanyName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.CompanyName}
                      ></input>
                    </Tippy>
                  </div>

                  <div>
                    <label
                      htmlFor="FromYear"
                      className="float-left text-blue-900 font-bold"
                    >
                      From Year
                    </label>
                    <br />
                    <Tippy
                      visible={visiFromyear}
                      content={formik.errors.FromYear}
                      placement="top-end"
                    >
                      <input
                        type="number"
                        placeholder="yyyy"
                        className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full h-full"
                        name="FromYear"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.FromYear}
                      ></input>
                    </Tippy>
                  </div>

                  <div>
                    <label
                      htmlFor="ToYear"
                      className="float-left text-blue-900 font-bold"
                    >
                      To Year
                    </label>
                    <br />
                    <Tippy
                      visible={visiToYear}
                      content={formik.errors.ToYear}
                      placement="top-end"
                    >
                      <input
                        type="number"
                        placeholder="yyyy"
                        className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full h-full"
                        name="ToYear"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.ToYear}
                      ></input>
                    </Tippy>
                  </div>

                  <div>
                    <label
                      htmlFor="Role"
                      className="float-left text-blue-900 font-bold"
                    >
                      Role
                    </label>
                    <br />
                    <Tippy
                      visible={visiRole}
                      content={formik.errors.Role}
                      placement="top-end"
                    >
                      <input
                        type="text"
                        placeholder="Full Stack Developer"
                        className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full h-full"
                        name="Role"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.Role}
                      ></input>
                    </Tippy>
                  </div>

                  <div>
                    <label
                      htmlFor="Type"
                      className="float-left text-blue-900 font-bold"
                    >
                      Type
                    </label>
                    <br />
                    <Tippy
                      visible={visiType}
                      content={formik.errors.Type}
                      placement="top-end"
                    >
                      <input
                        type="text"
                        placeholder="Internship Full time or Job"
                        className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full h-full"
                        name="Type"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.Type}
                      ></input>
                    </Tippy>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 font-bold float-left cursor-pointer bg-blue-900 text-white py-2 px-5 rounded"
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

export default EditExperience;
