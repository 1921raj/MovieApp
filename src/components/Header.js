import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import userIcon from '../assets/user.png';
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../constants/navigation';

const Header = () => {
    const location =useLocation();
    const removeSpace =location?.search?.slice(3)?.split("%20")?.join(" ");
    
    const [searchInput, setSearchInput] = useState(removeSpace);
    console.log("removeSpace",removeSpace)
    const navigate = useNavigate();
   
     
    console.log("location" ,)

    // Debounced search effect
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput.trim() !== '') {
                navigate(`/search?q=${searchInput}`);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [searchInput, navigate]);

    const handleSubmit = (e) => { e.preventDefault(); };

    return (
        <header className="fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40">
            <div className="flex items-center container mx-auto px-3 h-full">
                <Link to='/'>
                    <img src={logo} alt='logo' width={120} />
                </Link>

                <nav className="hidden lg:flex items-center gap-2 ml-5">
                    {navigation.map((nav, index) => (
                        <div key={index}>
                            <NavLink 
                                to={nav.href} 
                                className={({ isActive }) => `px-2 hover:text-neutral-100 ${isActive ? 'text-neutral-100' : ''}`}
                            >
                                {nav.label}
                            </NavLink>
                        </div>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-5">
                    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
                            onChange={(e) => setSearchInput(e.target.value)}
                            value={searchInput}
                        />
                        <button className="text-2xl text-white">
                            <IoSearchOutline />
                        </button>
                    </form>

                    <div className="w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all flex items-center ml-auto">
                        <img src={userIcon} alt="user" width={50} height={50} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
