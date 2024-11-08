import { Link } from "react-router-dom";

export default function TitleAuth({ type }: { type: "signup" | "signin" }) {
	return (
		<div className="text-center ">
			<div className="text-4xl font-extrabold ">
				{type === "signup" ? "Create an account" : "Login "}
			</div>
			<div>
				<div className="text-lg font-normal text-slate-500">
					{type === "signup"
						? "Already have an account?"
						: "Don't have an account?"}

					<Link
						to={type === "signup" ? "/signin" : "/signup"}
						className="pl-2 underline">
						{type === "signup" ? "Sign in" : "Sign up"}
					</Link>
				</div>
			</div>
		</div>
	);
}
