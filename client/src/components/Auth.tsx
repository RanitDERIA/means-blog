import { useState } from "react";
import { SignupInput } from "@praneethaylalvl1/medium-common";
import TitleAuth from "./AuthHeader";
import LabelInput from "./LabelInput";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { toast, Toaster } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import for navigation

// Define the Auth component
export default function Auth({ type }: { type: "signup" | "signin" }) {
	const [postInputs, setPostInputs] = useState<SignupInput>({
		name: "",
		email: "",
		password: "",
	});
	const navigate = useNavigate(); // Initialize navigate

	async function sendRequest() {
		try {
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
				postInputs
			);

			if (res.status === 200) {
				const jwt = res.data.jwt;
				localStorage.setItem("token", jwt); // Store JWT token
				const successMessage = type === "signin" ? "Login Successful" : "Signup Successful";
				toast.success(successMessage);

				// Redirect to /blogs after a successful login/signup
				navigate("/blogs");
			}
		} catch (error: any) {
			console.warn(error);
			const errorMessage = error.response?.data?.message ?? "Invalid Inputs";
			toast.warning(errorMessage, { duration: 2000 });
		}
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<TitleAuth type={type} />

			<div className="grid gap-3 pt-10">
				{type === "signin" ? null : (
					<LabelInput
						label="Name"
						type="text"
						placeholder="Name"
						onChange={(e) =>
							setPostInputs({ ...postInputs, name: e.target.value })
						}
					/>
				)}
				<LabelInput
					label="Email"
					type="text"
					placeholder="Email"
					onChange={(e) =>
						setPostInputs({ ...postInputs, email: e.target.value })
					}
				/>
				<LabelInput
					label="Password"
					type="password"
					placeholder="Password"
					onChange={(e) =>
						setPostInputs({ ...postInputs, password: e.target.value })
					}
				/>
				<button
					type="button"
					onClick={sendRequest}
					className="mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
				>
					{type === "signin" ? "Sign In" : "Sign Up"}
				</button>
			</div>
			<Toaster closeButton position="top-right" duration={1200} />
		</div>
	);
}
