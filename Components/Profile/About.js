import { useContext, useState, useEffect } from "react";
import EditAbout from "../EditWindows/EditAbout";
import { ProfileContext } from "@/Context/ProfileState";
const About = (props) => {
  const context = useContext(ProfileContext);
  const { name, data } = props;
  
  return (
    <>
      <EditAbout about={data} />
      <div className="w-full border-2 border-gray-200 p-3 grid gap-y-3">
        <div>
          <div className="flex justify-between w-full">
            <p className="font-semibold text-lg">About {name}</p>
            <button
              className="px-4  rounded-xl bg-gray-200 h-max my-auto"
              onClick={() => context.setEditAbout(true)}
            >
              Edit
            </button>
          </div>
          <div className="text-left w-full">{data}</div>
        </div>
      </div>
    </>
  );
};

export default About;
