import { useContext } from "react";
import { ProfileContext } from "../../Context/ProfileState";
import { AiOutlineDelete } from "react-icons/ai";
import EditEducation from "../EditWindows/EditEducation";
import Confirmtion from "../Modals/Confirmtion";
import { useState, useEffect } from "react";
const Education = (props) => {
  const context = useContext(ProfileContext);
  const { educations } = props;
 
  return (
    <div>
      <EditEducation />
      <Confirmtion
        message={context.warningMessage}
        url="education/deleteEducation"
        name="education"
      />
      <div className="flex justify-between w-full">
        <p className="font-semibold text-lg">Education</p>
        <button
          className="px-4  rounded-xl bg-gray-200 h-max "
          onClick={() => context.setEditEducation(true)}
        >
          Edit
        </button>
      </div>
      <div className="grid gap-y-3">
        {educations?.map((item, i) => {
          return (
            <div
              key={i}
              className="rounded-xl border-2 border-gray-200 px-3 py-4 w-full"
            >
              <div className="grid gap-y-2 w-full">
                <div className="text-left">
                  <b>{item.InstituteName}</b>
                </div>
                <div className="flex w-full justify-between">
                  <p>
                    (<span>{item.FromYear}</span>-<span>{item.ToYear}</span>)
                  </p>
                  <div className="flex gap-x-2">
                    <p>{item.Degree}</p>
                    <AiOutlineDelete
                      className="my-auto cursor-pointer hover:opacity-70"
                      onClick={() => [
                        context.setWarningMessage("delete education"),
                        context.setDeleteData(item),
                      ]}
                    />
                  </div>
                </div>
                <div className="text-left w-full">{item.About}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Education;
