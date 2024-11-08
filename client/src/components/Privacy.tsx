import React from 'react';

const Privacy: React.FC = () => {
    return (
        <div className="p-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
            <p className="text-gray-700 mb-4 max-w-5xl text-center">
                At <span className='font-bold'>Our Company</span>, your privacy is of utmost importance to us. This Privacy Policy outlines the types of
                data we collect, how we use it, and the measures we take to safeguard your information.
            </p>
            <p className="text-gray-700 mb-4 max-w-5xl">
            <h2 className="text-xl font-bold mb-2 text-black">Data Collection</h2>
                We collect information to enhance your experience with our platform. This includes <span className="font-bold">personal data</span> (like
                name, email, and contact information) and <span className="font-bold">usage data</span> to better understand how you interact with our services.
            </p>
            <p className="text-gray-700 mb-4 max-w-5xl">
            <h2 className="text-xl font-bold mb-2 text-black">Use of Information</h2>
                Information we collect is used to provide and improve our services, process transactions, and communicate
                with you. <span className="font-bold">We never sell your personal data to third parties.</span>
            </p>
            <p className="text-gray-700 mb-4 max-w-5xl">
            <h2 className="text-xl font-bold mb-2 text-black">Data Security</h2>
                We use industry-standard security measures to protect your data from unauthorized access. However, please
                be aware that <span className="font-bold">no system is completely secure</span>, and we cannot guarantee the absolute security of your
                data.
            </p>
            <p className="text-gray-700 mb-4 max-w-5xl">
            <h2 className="text-xl font-bold mb-2 text-black">Your Rights</h2>
                You have the right to access, correct, or delete your personal information. If you have any questions about
                your data or wish to make a request, please contact us.
            </p>
            <p className="text-gray-500 italic items-right">Last Updated: November 1, 2024</p>
        </div>
    );
};

export default Privacy;
