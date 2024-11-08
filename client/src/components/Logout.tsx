import { Toaster, toast } from "sonner";

export default function Logout() {
	async function handleLogout() {
		localStorage.removeItem("token");
		toast.success("Redirecting to Login page");
		setTimeout(() => {
			window.location.reload();
		}, 2000);
	}
	return (
		<div>
			<div
				className="cursor-pointer"
				onClick={() => {
					handleLogout();
				}}>
				Logout
			</div>
			<Toaster position="top-right"></Toaster>
		</div>
	);
}
