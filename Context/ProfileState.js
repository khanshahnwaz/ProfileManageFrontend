import { createContext,useEffect,useState } from "react";
const ProfileContext=createContext();
import React from 'react'

const ProfileState = (props) => {
   let data;
   useEffect(()=>{
    data=JSON.stringify(localStorage.getItem('data'))
   })

  //  save the domain , since localy our server is running in port 3001
  const url='http://localhost:3001'
  // const url='https://profilemanager-api.vercel.app'
     // state to enable or disable the successfull modal box
     const [successMessage, setSuccessMessage] = useState(null);
     // state to enable or disable the error modal box
     const [errorMessage, setErrorMessage] = useState(null);
     const[warningMessage,setWarningMessage]=useState(null);

     const[profileData,setProfileData]=useState(data);
     const[editProfile,setEditProfile]=useState(false);
     const[editAbout,setEditAbout]=useState(false);
     const[editSkills,setEditSkills]=useState(false);
     const[editCertificate,setEditCertificate]=useState(false);
     const[editExperience,setEditExperience]=useState(false);
     const[editEducation,setEditEducation]=useState(false);
     const[editImage,setEditImage]=useState(false)
    //  hook to keep the record to deleting data
    const[deleteData,setDeleteData]=useState('')
  return (
    <ProfileContext.Provider 
    value={{
      url:url,
        successMessage:successMessage,setSuccessMessage:setSuccessMessage,
        errorMessage:errorMessage,
        setErrorMessage:setErrorMessage,
        warningMessage:warningMessage,
        setWarningMessage:setWarningMessage,
        profileData:profileData,
        setProfileData:setProfileData,
        editProfile:editProfile,
        setEditProfile:setEditProfile,
        editAbout:editAbout,
        setEditAbout:setEditAbout,
        editSkills:editSkills,
        setEditSkills:setEditSkills,
        editCertificate:editCertificate,
        setEditCertificate:setEditCertificate,
        setEditExperience:setEditExperience,
        editExperience:editExperience,
        deleteData:deleteData,
        editEducation:editEducation,
        setEditEducation:setEditEducation,
        setDeleteData:setDeleteData,
        editImage:editImage,
        setEditImage:setEditImage
        }}>
 {props.children}
    </ProfileContext.Provider>
  )
}

export {ProfileContext,ProfileState};