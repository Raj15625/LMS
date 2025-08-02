import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
// import { assets} from '../../assets/assets'
// import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import logo from '../../assets/logo1.jpg'

const Navbar = () => {

  // const location = useLocation();
  const {navigate, isEducator} = useContext(AppContext)

  const isCourseListPage = location.pathname.includes('/course-list');

  const  {openSignIn} = useClerk()
  const {user} = useUser()

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>

        <div className='flex gap-2 items-center'>
          <img className='w-9 h-9' src={logo} alt="" />
          <h1 className='text-2xl font-bold'>EduNex</h1>
        </div>
      <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div className='flex items-center gap-5'>

          { user &&
           <>
             <button onClick={()=> {navigate('/educator')}}>{isEducator ? 'Educator Dashboard' : 'Become Educator'} </button>
          | <Link to='/my-enrollments'> My Enrollments</Link>
          </>
          }
            
        </div>
        
        { user ? <UserButton/> :
          <button onClick={openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full'> Create Accout</button>}
      </div>

      {/* For Phone Screens */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className='flex items-center gap-2 sm:gap-5 text-xs '>
          
          { user &&
           <>
             <button onClick={()=> {navigate('/educator')}}>{isEducator ? 'Educator Dashboard' : 'Become Educator'} </button>
          | <Link to='/my-enrollments'> My Enrollments</Link>
          </>
          }
          {
            user ? <UserButton /> : 
            <button onClick={()=> openSignIn()}><img src={assets.user_icon} alt=''/></button>
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
