import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="relative bottom-0 left-0 h-[10vh] flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 px-5">
      <section className="text-lg">
        Copyright {new Date().getFullYear} | All right reserved
      </section>
      <section className="flex items-center justify-center gap-5 text-2xl text-white">
        <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
          <BsFacebook />
        </a>
        <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
          <BsInstagram />
        </a>
        <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
          <BsLinkedin />
        </a>
        <a className="hover:text-yellow-500 transition-all ease-in-out duration-300">
          <BsTwitter />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
