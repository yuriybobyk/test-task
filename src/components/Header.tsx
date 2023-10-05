import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {ShoppingBag} from "./ShoppingBag";
import {ShoppingBagIcon} from "@heroicons/react/20/solid";


const Header = () => {

    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className="flex items-center space-x-2 md: space-x-10">
                {isMenuOpen ? <div>
                        <div className="w-8 h-8"/>
                        <ShoppingBag isOpen={isMenuOpen} onClose={closeMenu}/></div> :
                    <ShoppingBagIcon onClick={toggleMenu} className="h-8 w-8 cursor-pointer left-0"/>}
                <ul className="hidden space-x-4 md:flex">
                    <Link to={'/'} className="headerLink">Home</Link>
                    <Link to={'/mens'} className="headerLink">Mens</Link>
                    <Link to={'/womens'} className="headerLink">Womens</Link>
                    <Link to={'/electronics'} className="headerLink">Electronics</Link>
                </ul>
            </div>
        </header>
    );
};

export {Header}
