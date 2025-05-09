import React from 'react';
import { FaGithub } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t-2 py-6 px-4 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        <div>
          <p className="text-sm">© 2025 Movie App. All rights reserved.</p>
          <p className="text-sm">Developed by Sakil Ahmed</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-center">
          <a
            href="https://github.com/Sakil1246/Movie-Recommendation-System.git" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <span className="sm:ml-1">Help us to make it better — contributions welcome!</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
