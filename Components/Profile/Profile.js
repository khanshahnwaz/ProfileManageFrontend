import { FiSlack } from "react-icons/fi";
import { useState, useContext } from "react";
import { ProfileContext } from "@/Context/ProfileState";
import EditProfile from "../EditWindows/EditProfile";
import EditImage from "../EditWindows/EditImage";
import Skill from "./Skill";
import About from "./About";
import Certificate from "./Certification";
import Experience from "./Experience";
import Education from "./Education";
import Successful from "../Modals/Successful";
function Profile(props) {
  const context = useContext(ProfileContext);

  const { userData } = props;

  return (
    <>
      <EditProfile data={userData} />
      <EditImage />
      <Successful url="/home" />
      <div className="  w-full">
        <hr />
        <div className="bg-blue-900  lg:h-2/5 md:h-[250%] h-[10%] lg:w-4/5 w-[90%] mx-auto lg:mx-0 rounded-lg relative">
          <p className="text-white font-bold p-4">My Profile</p>

          <div className="w-full sm:w-4/5 mx-auto lg:mx-0 bg-white md:absolute top-[30%] h-max left-24 border-2 border-gray-200 rounded-lg shadow-md ">
            <div className="sm:p-4 py-4 px-1 md:flex gap-x-3">
              <div className="w-full grid gap-y-3">
                <div className="flex justify-between w-full break-normal">
                  <div className=" h-24 w-24">
                    <img className="rounded-full h-20" src={userData.Photo} />
                  </div>
                  <div>
                    <button
                      className="px-4 py-1 rounded-xl bg-gray-200 h-max my-auto"
                      onClick={() => context.setEditImage(true)}
                    >
                      Upload Photo
                    </button>
                  </div>
                </div>

                {/* first form section */}
                <div className="w-full border-2 border-gray-200 p-3 ">
                  {/* email */}
                  <div className='min-w-0 grid gap-y-3'>
                    <div className="flex justify-between">
                      <div>
                        <p>Email</p>
                        <p>{userData.Email}</p>
                      </div>
                      <button
                        className="px-4  rounded-xl bg-gray-200 h-max my-auto"
                        onClick={() => context.setEditProfile(true)}
                      >
                        Edit
                      </button>
                    </div>
           
                    <div className="flex justify-between">
                      <div>
                        <p>Your Name</p>
                        <p>{userData.Name}</p>
                      </div>
                      <button
                        className="px-4 rounded-xl bg-gray-200 h-max my-auto"
                        onClick={() => context.setEditProfile(true)}
                      >
                        Edit
                      </button>
                    </div>
                  

                  {/* phone  */}
                  <div className="flex justify-between">
                    <div>
                      <p>Phone Number</p>
                      <p>{userData.Phone}</p>
                    </div>
                    <button
                      className="px-4  rounded-xl bg-gray-200 h-max my-auto"
                      onClick={() => context.setEditProfile(true)}
                    >
                      Edit
                    </button>
                  </div>
                  </div>
                </div>

                {/* second form section: about  */}
                <About data={userData.About} name={userData.Name} />
                {/* second form : about ends */}

                {/* skill section  */}
                <Skill skills={userData.Skills} />
                {/* skill section ends  */}
              </div>

              {/* second section  */}
              <div className="w-full grid gap-y-5">
                <div className="w-full flex p-5 border-2 border-gray-200 rounded-lg h-max ">
                  <div className="text-left">
                    <b>Professional Details</b>
                    <p>
                      These are the professional details, shown to user in the
                      app.
                    </p>
                    {/* text written over here */}
                  </div>
                  <div className="text-xl">
                    <FiSlack className="text-blue-900" />
                    {/* star icon over here */}
                  </div>
                </div>

                {/* Certifications section */}
                <Certificate
                  certificates={
                    userData.Certificates
                      ? userData.Certificates[0].Certificate
                      : []
                  }
                />
                {/* Certification section ends here */}

                {/* Experience  */}
                <Experience experiences={userData.Experiences} />
                {/* Experience ends here */}

                {/* Education starts here  */}

                <Education educations={userData.Educations} />

                {/* Education ends here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
