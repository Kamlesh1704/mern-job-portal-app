import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Website Name */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-xl font-bold">JobHunt</h1>
          <p className="text-sm text-gray-400">© 2025 MyWebsite. All rights reserved.</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="#" className="hover:text-blue-400">
            <FacebookIcon/>
          </a>
          <a href="#" className="hover:text-blue-400">
            <TwitterIcon/>
          </a>
          <a href="#" className="hover:text-blue-400">
            <LinkedinIcon/>
          </a>
          <a href="#" className="hover:text-pink-400">
            <InstagramIcon/>
          </a>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
