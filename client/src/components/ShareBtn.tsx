import { toast } from "sonner";

export default function ShareBtn({ link }: { link: string }) {
	return (
		<div className="cursor-pointer">
			<a
				onClick={() => {
					navigator.clipboard.writeText(link);
					toast.success("Copied to clipboard!");
				}}
				title="Share Blog">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height={22}
					viewBox="0 0 24 24">
					<title>Share Blog</title>
					<path d="M12,1L8,5H11V14H13V5H16M18,23H6C4.89,23 4,22.1 4,21V9A2,2 0 0,1 6,7H9V9H6V21H18V9H15V7H18A2,2 0 0,1 20,9V21A2,2 0 0,1 18,23Z" />
				</svg>
			</a>
		</div>
	);
}
