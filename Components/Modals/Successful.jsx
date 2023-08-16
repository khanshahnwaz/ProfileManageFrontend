
import { useContext } from 'react';
import { ProfileContext } from '../../Context/ProfileState';
import { useRouter } from 'next/router';
const Successful = (props) => {
  const router=useRouter();
   const context=useContext(ProfileContext)
  const navigateToDetails=()=>{

    context.setSuccessMessage(null)

      router.push(props.url)
  }
  if(context.successMessage!=null){
  return (
    <div>
   
    {/* <!-- Overlay element --> */}
    <div id="overlay" className="fixed  z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60"></div>

    {/* <!-- The dialog --> */}
    <div id="dialog"
        className=" fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg">
        <h1 className="text-2xl font-semibold text-green-500 text-center">Success</h1>
        <div className="py-5 border-t border-b border-gray-300">
            <p className='text-center'>{context.successMessage}</p>
        </div>
        <div className="flex justify-end">
            {/* <!-- This button is used to close the dialog --> */}
            <button id="close" className="px-5 py-2 bg-indigo-500 hover:bg-indigo-700 text-white cursor-pointer rounded-md" onClick={navigateToDetails}>
                Ok</button>
        </div>
    </div>
    </div>
  )}else return null;
}

export default Successful