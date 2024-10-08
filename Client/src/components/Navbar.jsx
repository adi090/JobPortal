import React, { useState } from "react";
import { NavLink,Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useAuth0 } from '@auth0/auth0-react'
function Navbar() {
  const {user,loginWithRedirect,isAuthenticated,logout}=useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen( !isMenuOpen);
  };
  const navItems=[
    {path:"/",title:"Search"},
    {path:"/my-jobs",title:"My Jobs"},
    {path:"/salary",title:"Salary Estimate"},
    {path:"/post-job",title:"Post a Job"},
  ]
  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-5">
      <nav className="flex justify-between item-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <svg
            width="37"
            height="38"
            viewBox="0 0 37 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_40_427)">
              <circle
                cx="16.0143"
                cy="12.5143"
                r="12.0143"
                fill="#3575E2"
                fill-opacity="0.4"
              />
              <circle cx="20.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
            </g>
            <defs>
              <filter
                id="filter0_d_40_427"
                x="0"
                y="0.5"
                width="37"
                height="37"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_40_427"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_40_427"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          <span>Job Portal</span>
        </a>
        {/* nav items  */}
        <ul className="hidden md:flex gap-12">
            {
                navItems.map(({path,title})=>(
                    <li key={path} className="text-based text-primary">
                     <NavLink
                    to={path}
                    className={({ isActive}) => isActive ? "active": ""}
                    >
                   
                   {title}
                  </NavLink>
                    </li>
                       
                        
                    
                  
                ))
            }
        </ul>
        {/* signup and login */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {isAuthenticated ?(<Link className='bg-blue py-2 px-5 text-white ' onClick={(e)=>logout()}>Logout</Link>):(<Link to="/login" className="py-2 px-5 border rounded">Log in</Link>)}
            
            {/* ?<Link to="/sign-up" className="py-2 px-5 border rounded bg-blue text-white">Sign up</Link> */}
        </div>
        {/* mobile menu */}
        <div className="md:hidden block"> 
     <button onClick={handleMenuToggler}>
       {
        isMenuOpen ? <FaXmark className="w-5 h-5 text-primary"/> :  <FaBarsStaggered className="w-5 h-5 text-primary"/>
       }
     </button>
        </div>
      </nav>
      {/* nav item for mobile */}
      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden" }`}>
        <ul>
        {
                navItems.map(({path,title})=>(
                    <li key={path} className="text-based text-white first:text-white py-1">
                     <NavLink
                    to={path}
                    className={({ isActive}) => isActive ? "active": ""}
                    >
                   
                   {title}
                  </NavLink>
                    </li>
                       
                        
                    
                  
                ))
            } 
            <li className="text-white py-1">   <Link to="/login" >Log in</Link></li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
