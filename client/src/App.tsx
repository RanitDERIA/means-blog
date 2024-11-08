import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Editor from "./pages/Editor";
import Signin from "./pages/Signin";
import User from "./pages/User";
import UserBlogs from "./pages/UserBlogs";
import Settings from "./components/Settings";
import { Footer } from "./components/Footer";
import { Land } from "./pages/Land";
import Loader from "./components/Loader"; // Import the Loader component
import Privacy from "./components/Privacy";
import Terms from "./components/Terms";

function AppContent() {
    const location = useLocation();
    const hideFooter = location.pathname === "/"; // Hide footer only for the Land page

    return (
        <>
            <div className="flex-grow">
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/" element={<Land />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/write" element={<Editor edit={false} />} />
                    <Route path="/your-blogs" element={<UserBlogs />} />
                    <Route path="/edit/:id" element={<Editor edit={true} />} />
                    <Route path="/blog/:id" element={<Blog />} />
                    <Route path="/user/:id" element={<User />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="*" element={<Navigate to="/blogs" />} />
                </Routes>
            </div>
            {/* Conditionally render Footer */}
            {!hideFooter && <Footer />}
        </>
    );
}

function App() {
    const isLoggedIn = localStorage.token !== undefined && localStorage.token !== "";
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading or wait for data to be ready
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false); // Simulate data being loaded after a delay
        }, 1500); // Adjust the time as needed

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen flex-col">
                <Loader /> {/* Display the loader during loading */}
                <div className="mt-24 font-logo font-thik text-2xl text-gray-900">MEANS</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen font-head">
            <BrowserRouter>
                {!isLoggedIn ? (
                    <Routes>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="*" element={<Navigate to="/signin" />} />
                    </Routes>
                ) : (
                    <AppContent />
                )}
            </BrowserRouter>
        </div>
    );
}

export default App;
