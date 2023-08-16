import { useContext } from "react";
import { ProfileContext } from "../../Context/ProfileState";
import { AiOutlineDelete } from "react-icons/ai";
import Confirmation from "../Modals/Confirmtion";
import EditExperience from "../EditWindows/EditExperience";
import Error from "../Modals/Error";
import Successful from "../Modals/Successful";
import { useState, useEffect } from "react";
const Experience = (props) => {
  const context = useContext(ProfileContext);
  const { experiences } = props;
  

  return (
    <>
      <EditExperience experiences={experiences} />
      <div className="grid gap-y-2">
        <div className="flex justify-between w-full">
          <p className="font-semibold text-lg">Experience</p>
          <button
            className="px-4  rounded-xl bg-gray-200 h-max "
            onClick={() => context.setEditExperience(true)}
          >
            Edit
          </button>
        </div>
        <div className="grid gap-y-3 w-full">
          {experiences?.map((item, i) => {
            return (
              <div
                key={i}
                className="rounded-xl border-2 border-gray-200 px-3 py-4 w-full"
              >
                <div className="flex justify-between w-full">
                  <div className="text-left">
                    <p>
                      <span>{item.ExperienceYear}</span> Years (
                      <span>{item.FromYear}</span>-{item.ToYear})
                    </p>
                    <p>{item.CompanyName}</p>
                  </div>
                  <div>
                    <b>{item.Type}</b>
                    <p>{item.Role}</p>
                  </div>
                  <div className="flex gap-x-2">
                    <img className="h-10" src="/img/star.png" />
                    <AiOutlineDelete
                      className="my-auto cursor-pointer hover:opacity-70"
                      onClick={() => [
                        context.setDeleteData(item),
                        context.setWarningMessage("delete experience"),
                      ]}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Experience;
