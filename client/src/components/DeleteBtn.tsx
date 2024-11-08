import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useUserDetails } from "../hooks";
import { Toaster, toast } from "sonner";

export default function DeleteBtn({
	authorId,
	blogId,
}: {
	authorId: string;
	blogId: string;
}) {
	async function handleDelete(id: string) {
		await axios
			.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then(() => {
				toast.success("Blog Deleted");
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			});
	}
	const userDetails = useUserDetails(localStorage.getItem("token"));
	return (
		<div>
			{userDetails.id === authorId ? (
				<svg
					onClick={() => {
						handleDelete(blogId);
					}}
					height={24}
					width={22}
					className="cursor-pointer"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24">
					<title>Delete Blog</title>
					<path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
				</svg>
			) : (
				""
			)}
			<Toaster position="top-right"></Toaster>
		</div>
	);
}
