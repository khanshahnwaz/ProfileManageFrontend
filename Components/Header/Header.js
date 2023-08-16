import { FiChevronDown, FiBell } from "react-icons/fi";
import ResNav from "./ResNav";
import { useEffect, useState } from "react";
const Header = (props) => {
  
  const { name, photo } = props;

  return (
    <>
      <ResNav setSection={props.setSection} name={name} photo={photo} />
      <div className=" px-10 h-2/5 w-full my-auto lg:block hidden">
        <div className="flex justify-between my-auto">
          <div className="px-4 py-2 h-max border-2 rounded-lg border-gray-300 text-lg font-semibold ">
            Dashboard
          </div>
          <div className="flex justify-between gap-x-5">
            <div className="m-auto text-xl">
              <FiBell />
            </div>
            <div className="flex justify-center gap-x-2 px-4 py-2 h-max border-2 rounded-lg border-gray-300 ">
              <div className="m-auto h-max">
                {/* image */}
                <img src={photo} className="h-10" />
              </div>
              <div>
                <small>Welcome back,</small>
                <p className="text-lg font-semibold ">{name}</p>
              </div>
              <FiChevronDown className="m-auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
