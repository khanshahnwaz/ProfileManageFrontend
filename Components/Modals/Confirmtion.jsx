import React from "react";
import { useContext, useState } from "react";
import { ProfileContext } from "../../Context/ProfileState";
import { useRouter } from "next/router";
const Confirmtion = (props) => {
  const context = useContext(ProfileContext);
  // console.log("In confirmation box warninh message is",context.warningMessage)
  const navigate = useRouter();
  // function that will navigate user on the same page if NO delete/edit option is selected
  const navigation = () => {
    console.log("this is me aborting");
    context.setWarningMessage(null);
    // navigate.push(props.url)
  };

  // perform desired operation after positive confirmation
  const operation = async () => {
    // console.log("I am runnning in confimation modal")
    // if user is trying to log out
    if (props.message == "logOut") {
      console.log("logging out");
      navigate.push("/");
      localStorage.removeItem("token");
      localStorage.removeItem("data");
      // context.setLoggedInName('Andc_Treasure')
    }
    // case 2: User is trying to delete any publication
    else if (props.message == "delete certificate") {
      console.log("Deleting data", context.deleteData);
      // SET THE DELETE DATA

      const response = await fetch(
        `${context.url}/Certificates/deleteCertificate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          //   reusing editData state to send delete data
          body: JSON.stringify(context.deleteData),
        }
      );
      // console.log("Hello am I running.")
      const result = await response.json();
      if (result.status == 200) {
        let temp = JSON.parse(localStorage.getItem("data"));

        // context.setSuccessMessage("Certificate deleted successfully.")
        temp.certificate = result.data;
        console.log("New data is", temp);
        localStorage.setItem("data", JSON.stringify(temp));

        context.setWarningMessage(null);
      } else {
        context.setErrorMessage(result.Message);
        console.log("not deleted due to", result.Message);
      }
    } else if (props.message == "delete education") {
      const response = await fetch(
        `${context.url}/education/deleteEducation`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          //   reusing editData state to send delete data
          body: JSON.stringify(context.deleteData),
        }
      );

      const result = await response.json();
      if (result.status == 200) {
        let temp = JSON.parse(localStorage.getItem("data"));

        // context.setSuccessMessage("Experience deleted successfully.")

        temp.education = result.data;
        localStorage.setItem("data", JSON.stringify(temp));

        context.setWarningMessage(null);
      } else {
        context.setErrorMessage(result.Message);
        console.log("not deleted due to", result.Message);
      }
    } else if (context.warningMessage == "delete experience") {
      const response = await fetch(
        `${context.url}/experiences/deleteExperience`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          //   reusing editData state to send delete data
          body: JSON.stringify(context.deleteData),
        }
      );

      const result = await response.json();
      if (result.status == 200) {
        let temp = JSON.parse(localStorage.getItem("data"));
        temp.experience = result.data;
        localStorage.setItem("data", JSON.stringify(temp));
        // context.setSuccessMessage(result.Message)
      } else {
        context.setErrorMessage(result.Message);
        console.log("not deleted due to", result.Message);
      }
    }
    context.setWarningMessage(null);
  };

  // if confirmation message for delete/edit is yes
  // state to call editComponent

  if (context.warningMessage != null) {
    // console.log("Hello I am outside",props.url)
    return (
      <div>
        {/* <!-- Overlay element --> */}
        <div
          id="overlay"
          className="fixed  z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"
        ></div>
        {/* <!-- The dialog --> */}
        <div
          id="dialog"
          className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg"
        >
          <h1 className="text-2xl font-semibold text-yellow-500 text-center">
            Warning
          </h1>
          <div className="py-5 border-t border-b border-gray-300">
            <p className="text-center">
              Are you sure want to {props.message} ?
            </p>
          </div>
          <div className="flex justify-between">
            {/* this button is used to proceed with the operation */}
            <button
              id="close"
              className="px-5 py-2 bg-indigo-500 hover:bg-red-700 text-white cursor-pointer rounded-md"
              onClick={operation}
            >
              Yes
            </button>
            {/* <!-- This button is used to close the dialog --> */}
            <button
              id="close"
              className="px-5 py-2 bg-indigo-500 hover:bg-green-700 text-white cursor-pointer rounded-md"
              onClick={navigation}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  } else return null;
  // <>
  // <Successful url='/profile'/>
  // <Error url='/bookDetails'/></>
};

export default Confirmtion;
