import {FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/router";
import { ProfileContext } from "@/Context/ProfileState";
import { useContext } from "react";
import Confirmtion from "./Modals/Confirmtion";
const SideNavBar = (props) => {
  const context=useContext(ProfileContext);
   const router=useRouter(); 
  return (
    <>
    <Confirmtion message={context.warningMessage} url='/home'/>
    <div className="h-[80vh] xl:px-10 px-3 w-[10%] lg:w-[15%] relative hidden lg:block">
        <div className="grid gap-y-5">


         <div className="flex gap-x-3" onClick={()=>props.setSection(true)}>
         <FiChevronRight className='my-auto' />
        <div className="px-4 py-2 h-max border-2 rounded-lg border-gray-300 text-lg font-semibold w-full ">
           
       <p className="text-center">Profile</p>
       
        </div>
         </div>
       
       <div className="flex gap-x-3"  onClick={()=>props.setSection(false)}>
       <FiChevronRight className='my-auto'/>
       <div className="px-4 py-2 h-max border-2 rounded-lg border-gray-300 text-lg font-semibold w-full  ">
            <p className="text-center">Connections</p>
           
        </div>
       </div>
       
        </div>
        <div className="px-10 rounded-lg  text-lg font-semibold  text-center  absolute bottom-0">
            <button className=" " onClick={()=>{context.setWarningMessage('logOut')}}>LogOut</button>
        </div>
    </div>
    </>
  )
}

export default SideNavBar