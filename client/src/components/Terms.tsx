import React from 'react';

const Terms: React.FC = () => {
    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-700 mb-4 max-w-6xl">
                Welcome to <span className="font-bold">Our Company</span>! By accessing or using our services, you agree to the following terms and
                conditions.
            </p>
            <p className="text-gray-700 mb-4 max-w-6xl">
            <h2 className="text-xl font-bold mb-2 text-black">User Obligations</h2>
                You agree to use our services responsibly and comply with all applicable laws and regulations. <span className="font-bold">Any misuse
                of our platform</span> may result in account suspension or termination.
            </p>
            <p className="text-gray-700 mb-4 max-w-6xl">
            <h2 className="text-xl font-bold mb-2 text-black">Intellectual Property</h2>
                All content on this platform, including text, images, and code, is the intellectual property of <span className="font-bold">Our
                Company</span>. You may not reproduce or distribute this content without our permission.
            </p>
            <p className="text-gray-700 mb-4 max-w-6xl">
            <h2 className="text-xl font-bold mb-2 text-black">Limitation of Liability</h2>
                We are not liable for any damages or losses arising from your use of our services. Our platform is provided
                "as is," without warranties of any kind. It is your responsibility to review these terms regularly.Your
                continued use of our services implies acceptance of any modifications.
            </p>
            
            <p className="text-gray-700 mb-4 max-w-6xl">
            <h2 className="text-xl font-bold mb-2 text-black">Amendments to Terms</h2>
                We may update these terms periodically. It is your responsibility to review these terms regularly. <span className="font-bold">Your
                continued use of our services implies acceptance of any modifications.</span>
            </p>
            <p className="text-gray-500 italic">Last Updated: November 1, 2024</p>
        </div>
    );
};

export default Terms;
