'use client'; // This is a client component 👈🏽
import Button from '@/components/Button';
import Image from 'next/image';
import crossIcon from '@/public/svg/cross-icon.svg';
import logoBlack from '@/public/svg/logo-black-icon.svg';
import { useState } from 'react';
import './index.scss';

const navbarLinks = ['home', 'surfing', 'hula', 'vulcano'];

function Navbar() {
  const [navbarPopupOpen, setNavbarPopupOpen] = useState(false);
  return (
    <>
      <div className="navbar-wrapper-desktop sm:hidden md:flex">
        <div className="shadow-2xl navbar-desktop">
          <div className="flex items-center">
            <Image src={logoBlack} alt="logo" className="mr-20" />
            {navbarLinks.map(item => (
              <div key={item} className="px-6 font-medium leading-3 capitalize">
                {item}
              </div>
            ))}
          </div>
          <div>
            <Button>Book a trip</Button>
          </div>
        </div>
      </div>
      <div className="navbar-small-devices sm:flex md:hidden">
        <Image src={logoBlack} alt="logo" />
        <div
          className="mr-5 cursor-pointer"
          onClick={() => setNavbarPopupOpen(true)}
        >
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className={`w-8 h-1 bg-black ${index !== 2 && 'mb-1.5'}`}
            ></div>
          ))}
        </div>
        {navbarPopupOpen && (
          <div className="absolute top-0 left-0 w-screen h-screen bg-[#0000004b]  justify-end md:hidden sm:flex">
            <div className="w-[90vw] bg-white h-screen p-7">
              <div className="flex justify-end">
                <Image
                  src={crossIcon}
                  width={40}
                  height={40}
                  alt=""
                  className="cursor-pointer"
                  onClick={() => setNavbarPopupOpen(false)}
                />
              </div>
              <div className="mt-12">
                {navbarLinks.map(item => (
                  <div
                    key={item}
                    className="mb-10 text-xl capitalize cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <Button>Book a trip</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
