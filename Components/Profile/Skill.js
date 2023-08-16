import {useContext,useState,useEffect} from 'react'
import EditSkills from '../EditWindows/EditSkills'
import { ProfileContext } from '@/Context/ProfileState'

const Skill = (props) => {
    const context=useContext(ProfileContext);
    const{skills}=props;
    
  return (
    <>
    <EditSkills skills={skills} />
    <div className='w-full border-2 border-gray-200 p-3 grid gap-y-3'>
                      <div className='flex justify-between w-full'>
                                <p className='font-semibold text-lg'>Skills</p>
                                <button className='px-4  rounded-xl bg-gray-200 h-max my-auto' onClick={()=>context.setEditSkills(true)}>Edit</button>
                            </div>
                            {skills?.map((item,i)=>{
                                return <div key={i}>{item}</div>
                            })}
                      </div>
                      </>
  )
}

export default Skill