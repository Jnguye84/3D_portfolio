import { NavLink } from "react-router-dom";

import { logo, writing } from "../assets/images";

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/'>
        <img src={logo} alt='logo' className='w-20 h-20 object-contain' />
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }>
          ABOUT
        </NavLink>
        <NavLink to='/tech'  className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          TECH
        </NavLink>
        <NavLink to='/writing'  className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          WRITING
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
