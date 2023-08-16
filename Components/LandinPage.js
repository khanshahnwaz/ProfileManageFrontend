import React, { useEffect ,useContext} from 'react'
import Header from './Header/Header'
import SideNavBar from './SideNavBar';
import Profile from './Profile/Profile';
import Connection from './Connections/Connections';
import { ProfileContext } from '../Context/ProfileState';
import { useState } from 'react';
const LandingPage = () => {
    const context=useContext(ProfileContext);
    // hooks to navigate between sections
  const[section,setSection]=useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      const response = await fetch(`${context.url}/user/getData`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
          
        }
      });
      const result = await response.json();
      setUserData(result.data);
      // setUrl(result.data.Photo)
      console.log("Recieved data is", result);
      
    }
    fetchImage();
  }, [context]);
  if(userData){
  return (
   <>
 
      <Header setSection={setSection} name={userData.Name} photo={userData.Photo} />
      <div className='flex w-full gap-x-5'>
      <SideNavBar setSection={setSection} section={section} />
    {section?<Profile userData={userData} />:<Connection/>}
      </div> </>
  )}
}

export default LandingPage;