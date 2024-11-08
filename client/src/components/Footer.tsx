import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
    return (
        <footer className="border-t flex flex-col items-center px-16 py-4 bg-[#122023] text-white font-semibold text-sm mt-4">
            {/* Social Media Links */}
            <div className="flex gap-6 mb-2">
                <a href="https://twitter.com/DeriaRanit" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} className="text-xl hover:text-[#068932] transition-colors duration-200" />
                </a>
                <a href="https://twitter.com/DeriaRanit" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} className="text-xl hover:text-[#068932] transition-colors duration-200" />
                </a>
                <a href="https://www.linkedin.com/in/ranit-deria-916864257/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} className="text-xl hover:text-[#068932] transition-colors duration-200" />
                </a>
            </div>

            {/* Copyright Text */}
            <div className="text-center text-xs text-gray-400 mb-2">
                © 2024 MEANS. All Rights Reserved.
            </div>

            {/* Privacy & Terms Links */}
            <div className="flex gap-4 text-gray-300">
                <Link to="/privacy" className="hover:text-white transition-colors duration-200">
                    Privacy
                </Link>
                <Link to="/terms" className="hover:text-white transition-colors duration-200">
                    Terms
                </Link>
            </div>
        </footer>
    );
};
