import { useContext } from "react";
import EditCertificate from "../EditWindows/EditCertificate";
import { ProfileContext } from "@/Context/ProfileState";
import { AiOutlineDelete } from "react-icons/ai";
import Confirmation from "../Modals/Confirmtion";
import Successful from "../Modals/Successful";
import { useState, useEffect } from "react";
const Certification = (props) => {
  const context = useContext(ProfileContext);
  const { certificates } = props;
  
  return (
    <>
      <EditCertificate certificates={certificates} />
    
      <div className="grid gap-y-2">
        <div className="flex justify-between w-full">
          <p className="font-semibold text-lg">Certifications</p>
          <button
            className="px-4  rounded-xl bg-gray-200 h-max "
            onClick={() => context.setEditCertificate(true)}
          >
            Edit
          </button>
        </div>
        {/* add certificate */}
        {certificates?.map((item, i) => {
          return (
            <div key={i} className="w-full flex   rounded-lg h-max">
              <div className="rounded-3xl border-2 border-gray-200 px-3 py-4 grid gap-y-3 w-full">
                <div className="flex justify-between w-full">
                  <div>
                    <img className="h-10" src="/img/star.png" />
                  </div>
                  <div className="flex gap-x-2">
                    <div>
                      <b>{item.Name}</b>
                      <p>{item.Platform}</p>
                    </div>
                    <AiOutlineDelete
                      className="my-auto cursor-pointer hover:opacity-70"
                      onClick={() => [
                        context.setWarningMessage("delete certificate"),
                        context.setDeleteData({
                          Name: item.Name,
                          Platform: item.Platform,
                        }),
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* add certificate box  */}
      </div>
    </>
  );
};

export default Certification;
