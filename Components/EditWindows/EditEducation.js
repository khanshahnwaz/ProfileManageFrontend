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
const EditEducation = (props) => {
  const context = useContext(ProfileContext);
  const [visiInstituteName, setvisiInstituteName] = useState(false);
  const [visiFromyear, setVisiFromyear] = useState(false);
  const [visiToYear, setVisiToYear] = useState(false);
  const [visiRole, setVisiRole] = useState(false);
  const [visiDegree, setvisiDegree] = useState(false);
  const [visiCompanyName, setVisiCompanyName] = useState(false);
  const router = useRouter();

  // Formik library
  const formik = useFormik({
    initialValues: {
      InstituteName: "",
      FromYear: "",
      ToYear: "",
      Degree: "",
      About: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.InstituteName) errors.InstituteName = "Required";
      if (!values.FromYear) errors.FromYear = "Required";
      if (!values.ToYear) errors.ToYear = "Required";
      else if (values.ToYear - values.FromYear < 0)
        errors.ToYear = "Invalid duration of education";
      else if (values.ToYear > new Date().getFullYear())
        errors.ToYear = "Invalid year";
      if (!values.Degree) errors.Degree = "Required";
      if (!values.About) errors.About = "Required";

      return errors;
    },
    onSubmit: async (values) => {
      console.log("submitted");
      console.log("sent data", JSON.stringify(values));
      const response = await fetch(
        `${context.url}/education/createEducation`,
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
        console.log("New education added. ");
        context.setEditEducation(false);
      
      } else {
        context.setErrorMessage(result.Message);
      }
    },
  });

  useEffect(() => {
    if (formik.errors.InstituteName && formik.touched.InstituteName)
      setvisiInstituteName(true);
    else setvisiInstituteName(false);
    if (formik.errors.FromYear && formik.touched.FromYear)
      setVisiFromyear(true);
    else setVisiFromyear(false);
    if (formik.errors.ToYear && formik.touched.ToYear) setVisiToYear(true);
    else setVisiToYear(false);
    if (formik.errors.About && formik.touched.About) setVisiRole(true);
    else setVisiRole(false);
    if (formik.errors.Degree && formik.touched.Degree) setvisiDegree(true);
    else setvisiDegree(false);
  }, [formik]);
  if (context.editEducation) {
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
            onClick={() => context.setEditEducation(false)}
          />

          {/* right division */}
          <div className="bg-white h-full w-[100%] ">
            <div className=" md:pb-10 sm:p-5 ">
              {/* Form section  */}

              <form onSubmit={formik.handleSubmit}>
                <div className="">
                  <div>
                    <label
                      htmlFor="experienceName"
                      className="float-left text-blue-900 font-bold"
                    >
                      Institute Name
                    </label>
                    <br />
                    <Tippy
                      visible={visiInstituteName}
                      content={formik.errors.InstituteName}
                      placement="top-end"
                    >
                      <input
                        type="text"
                        placeholder="IIT Delhi"
                        className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full h-full"
                        name="InstituteName"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.InstituteName}
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
                      htmlFor="About"
                      className="float-left text-blue-900 font-bold"
                    >
                      About
                    </label>
                    <br />
                    <Tippy
                      visible={visiRole}
                      content={formik.errors.About}
                      placement="top-end"
                    >
                      <textarea
                        type="text"
                        placeholder="xyz"
                        className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full h-full"
                        name="About"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.About}
                      ></textarea>
                    </Tippy>
                  </div>

                  <div>
                    <label
                      htmlFor="Degree"
                      className="float-left text-blue-900 font-bold"
                    >
                      Degree
                    </label>
                    <br />
                    <Tippy
                      visible={visiDegree}
                      content={formik.errors.Degree}
                      placement="top-end"
                    >
                      <input
                        type="text"
                        placeholder="Btech"
                        className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full h-full"
                        name="Degree"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.Degree}
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

export default EditEducation;
