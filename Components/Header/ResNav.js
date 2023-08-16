import {FiChevronDown,FiBell,FiAlignJustify } from "react-icons/fi";
import { useRouter } from "next/router";
function ResNav(props) {
  const router=useRouter();
  const {name,photo}=props;
    const Menu= (e)=>{
        let list = document.querySelector('ul');
        e.name === 'menu' ? (e.name = "close",list.classList.add('top-[80px]') , list.classList.add('opacity-100')) :( e.name = "menu" ,list.classList.remove('top-[80px]'),list.classList.remove('opacity-100'))
      }
  return (
<nav className="p-5 bg-white shadow lg:hidden"  name="menu" onClick={(e)=>Menu(e.target)}>
  <div className="flex justify-between">
<div className="text-3xl cursor-pointer mx-2 block my-auto" >
    {/* <p name="menu" onClick={(e)=>Menu(e.target)}>CLick me</p> */}
    <FiAlignJustify/>
  </div>
<div className="flex justify-between items-center gap-x-2">
<div  className='m-auto text-xl' >
         <FiBell />
         </div>
   <div className="flex justify-center gap-x-2 px-4 py-2 h-max border-2 rounded-lg border-gray-300 ">
            <div className="m-auto h-max">
                {/* image */}
                <img src={photo} className="h-10"/>
            </div>
            <div>
                <small>Welcome back,</small>
                <p className="text-lg font-semibold ">{name}</p>
            </div>
            <FiChevronDown className='m-auto'/>
        </div>
        </div>
 
</div>

<ul className=" z-50 absolute bg-white w-full left-0  py-4  pl-7  opacity-0 top-[-400px] transition-all ease-in duration-500 ">

<li className="mx-4 my-6 md:my-0" onClick={()=>props.setSection(true)}>
    <p className="text-xl hover:text-blue-700 duration-500">PROFILE</p>
  </li>
  <li className="mx-4 my-6 md:my-0" onClick={()=>props.setSection(false)}>
    <p className="text-xl hover:text-blue-700 duration-500">CONNECTIONS</p>
  </li>
  <li className="mx-4 my-6 md:my-0 text-xl hover:text-blue-700 duration-500" onClick={()=>[localStorage.removeItem('token'),router.push('/')]}>
    LogOut
  </li>
</ul>
</nav>
  )
}

export default ResNav