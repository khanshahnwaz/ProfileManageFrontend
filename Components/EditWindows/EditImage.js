import { useFormik } from "formik";
import { useContext, useState } from "react";

import { ProfileContext } from "@/Context/ProfileState";
import { useRouter } from "next/router";
import { FiX } from "react-icons/fi";
const EditImage = (props) => {
  const context = useContext(ProfileContext);
  const [selectedFile, setSelectedFile] = useState("");
  const handleChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const router = useRouter();

  // state to manage the error tooltip for every input box

  // Formik library

  const handleImage = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      sendImage(reader.result);
    };
    context.setEditImage(false);
    // console.log(formData)
  };
  const sendImage = async (imageStr) => {
    // console.log(imageStr)
    // now send this image to backend
    const response = await fetch(`${context.url}/user/editImage`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ photo: imageStr }),
    });
    const result = await response.json();
    console.log(result);
    if (result.status == 200) {
      context.setEditImage(false);
      context.setSuccessMessage(result.Message);
    } else context.setErrorMessage(result.Message);
  };

  if (context.editImage) {
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
            onClick={() => context.setEditImage(false)}
          />

          {/* right division */}
          <div className="bg-white h-full w-[100%] ">
            <div className=" md:pb-10 sm:p-5 ">
              {/* Form section  */}

              <form id="form" onSubmit={handleImage}>
                <div className="">
                  <div>
                    <label
                      htmlFor="photo"
                      className="float-left text-blue-900 font-bold"
                    >
                      Photo
                    </label>
                    <br />
                    <input
                      type="file"
                      className="border-2 border-[#bd8ce2] rounded-lg float-left mt-1 py-2 w-full h-full"
                      name="image"
                      onChange={handleChange}
                    ></input>
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

export default EditImage;
