import { faGalacticSenate, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

export const Land: React.FC = () => {
    return (
        <div className="bg-[#faf9f7] min-h-screen flex flex-col justify-between px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
                {/* Text Section */}
                <div className="lg:w-1/2 mb-10 lg:mb-0">
                    {/* Logo and MEANS in the same line */}
                    <div className="flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 mr-3 text-[#068932]">
                            <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                            <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                            <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                        </svg>
                        <div className="text-3xl font-bold font-logo text-black">
                            <Link to="/">MEANS</Link>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-head font-semibold text-gray-900 mb-4">
                        Human stories & ideas
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 mb-8">
                        A place to read, write, and deepen your understanding
                    </p>
                    <Link to="/blogs">
                        <button className="bg-gray-900 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors">
                            Start reading
                        </button>
                    </Link>
                </div>

                {/* Image Section */}
                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                    <img
                        src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
                        alt="Abstract illustration"
                        className="max-w-full h-auto lg:max-w-md xl:max-w-lg" // Set max-width on large screens
                    />
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t text-gray-400 font-semibold text-sm py-4">
                {/* Social Media Links, Privacy & Terms, and Copyright all in a single line */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-16">
                    {/* Social Media Links */}
                    <div className="flex gap-6 mb-4 sm:mb-0 justify-center sm:justify-start">
                        <a href="https://twitter.com/DeriaRanit" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} className="text-xl hover:text-[#068932] transition-colors duration-200" />
                        </a>
                        <a href="https://github.com/DeriaRanit" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} className="text-xl hover:text-[#068932] transition-colors duration-200" />
                        </a>
                        <a href="https://www.linkedin.com/in/ranit-deria-916864257/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} className="text-xl hover:text-[#068932] transition-colors duration-200" />
                        </a>
                    </div>

                    {/* Copyright Text */}
                    <div className="text-center text-xs text-gray-400 mb-4 sm:mb-0">
                        © 2024 MEANS. All Rights Reserved.
                    </div>

                    {/* Privacy & Terms Links */}
                    <div className="flex gap-4 text-gray-400 justify-center sm:justify-end">
                        <Link to="/privacy" className="hover:text-[#068932] transition-colors duration-200">
                            Privacy
                        </Link>
                        <Link to="/terms" className="hover:text-[#068932] transition-colors duration-200">
                            Terms
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};
