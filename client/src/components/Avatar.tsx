export default function Avatar({
	name = "?", // Default to "?" if name is undefined
	size = "small",
}: {
	name?: string; // Make name optional to prevent TypeScript errors
	size?: "big" | "small";
}) {
	// Define a list of background colors
	const colors = ["bg-red-500", "bg-[#f59e0b]", "bg-green-500", "bg-sky-500"];
	// Use a hash of the name or another method to pick a color from the list
	const colorClass = colors[name.charCodeAt(0) % colors.length];

	return (
		<div
			className={`relative inline-flex items-center justify-center overflow-hidden rounded-full text-white ${colorClass}
				${
					size === "big"
						? "h-10 w-10 text-xl font-bold"
						: "h-8 w-8 text-base font-medium"
				}
			`}>
			<span>{name[0]?.toUpperCase()}</span>
		</div>
	);
}
