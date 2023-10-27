import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from "./sidebarData";
import './navBar.css';
import { IconContext } from 'react-icons';
import avatar from "../../assets/26220662-623f-4697-bd29-b27e3ef7f513fdf.jpg";
import logo from '../../assets/image-removebg-preview.png'

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#000' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div>
                <img  className="w-32 h-13 text-purple-600" src={logo} alt="sdd" />
              
              </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
                      </li>
                      <div className="text-center">
          <img
            src={avatar}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto"
          />
          <p className="text-lg font-semibold mt-2">Sidhath</p>

          <p className="text-gray-600">sidharth@gmail.com</p>
        </div>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
