// Update the import to ensure it matches the updated component type
import Auth from "../components/Auth.js";
import { Quote } from "../components/Quote"; // Ensure correct path and component type

export default function Signup() {
    return (
        <div className="grid lg:grid-cols-2 font-head">
            <div>
                <Auth type="signup" />
            </div>
            <div className="invisible lg:visible">
                <Quote /> {/* Use self-closing tag for the Quote component */}
            </div>
        </div>
    );
}