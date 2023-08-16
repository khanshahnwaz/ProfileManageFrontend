import { useContext, useEffect, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { ProfileContext } from "@/Context/ProfileState";

function Card(props) {
  const context = useContext(ProfileContext);
  // console.log(props);
  const removeConnection = async (email) => {
    const response = await fetch(
      `${context.url}/connection/removeConnection`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ email: email }),
      }
    );
    const result = await response.json();
    if (result.status == 200) {
      context.setSuccessMessage(result.Message);
    } else {
      context.setErrorMessage(result.Message);
    }
  };
  const createConnection = async (email) => {
    const response = await fetch(
      `${context.url}/connection/createConnection`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ email: email }),
      }
    );
    const result = await response.json();
    if (result.status == 201) {
      context.setSuccessMessage(result.Message);
    } else {
      context.setErrorMessage(result.Message);
    }
  };

  return (
    <>
      <div className="border-gray-200 rounded-xl shadow-md hover:shadow-2xl sm:p-4 p-2 flex justify-evenly ">
        <div className="my-auto w-full ">
          <div className="sm:pr-5">
            <p>{props.data.Name}</p>
            <div>
              <p>{props.data.Email}</p>
              <div className="flex justify-start gap-x-1">
                <FiPhone className="my-auto" />
                <p>{props.data.Phone}</p>
              </div>
            </div>
          </div>
          {props.connection ? (
            <button
              className="py-1 px-2 rounded-xl bg-gray-200 h-max my-auto hover:opacity-60"
              onClick={() => removeConnection(props.data.Email)}
            >
              Remove Connection
            </button>
          ) : (
            <button
              className="px-4 py-1 rounded-xl bg-gray-200 h-max my-auto hover:opacity-60"
              onClick={() => createConnection(props.data.Email)}
            >
              Add Connection
            </button>
          )}
        </div>

        <div className=" h-1/2 w-1/2 ">
          <img className="rounded-full " src={props.data.Photo} />
        </div>
      </div>
    </>
  );
}

export default Card;
