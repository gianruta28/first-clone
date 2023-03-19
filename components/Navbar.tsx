import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";

import {BsChevronDown, BsSearch, BsBell} from 'react-icons/bs'
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {

    const [showMenu, setMenu] = useState(false);
    const [showAccMenu, setAccMenu] = useState(false);
    const [showBg, setShowBg] = useState(false);
    
    const toggleMenu = useCallback(() => {
        setMenu((current) => !current)
    }, [])
    const toggleAccMenu = useCallback(() => {
        setAccMenu((current) => !current)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET){
                setShowBg(true);
            }else{
                setShowBg(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () =>{
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);

    return ( 
        <nav className="w-full fixed z-40">
            <div 
                className={`
                    px-4
                    md:px-16
                    py-6
                    flex
                    flex-row
                    items-center
                    transition
                    duration-500
                    ${showBg ? 'bg-zinc-900 bg-opacity-90' : ''}
                    `}>
                        
                <img className="h-4 lg:h-7" src="/img/logo.png" alt="Logo" />
                <div 
                    className="
                        flex-row
                        ml-8
                        gap-7
                        hidden
                        lg:flex">
                    <NavbarItem label="Home"/>
                    <NavbarItem label="Series"/>
                    <NavbarItem label="Movies"/>
                    <NavbarItem label="New & Popular"/>
                    <NavbarItem label="My List"/>
                    <NavbarItem label="Browse by languages"/>
                </div>
                <div onClick={toggleMenu}
                    className="
                        lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMenu ? 'rotate-180' : 'rotate-0'}`}/>
                    <MobileMenu visible={showMenu}></MobileMenu>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch/>
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell/>
                    </div>
                    <div onClick={toggleAccMenu}  className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/img/default-blue.png" alt="" />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccMenu ? 'rotate-180' : 'rotate-0'}`}/>
                        
                        <AccountMenu visible={showAccMenu}/>
                    </div>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;