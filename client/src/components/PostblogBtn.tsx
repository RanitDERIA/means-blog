export default function PostblogBtn({
	id,
	title,
	markdown,
	postBlog,
}: {
	id: string;
	title: string;

	markdown: string;
	postBlog: any;
}) {
	return (
		<div className="font-head">
			{" "}
			<div className="flex justify-end gap-3 py-3 mr-5 border-b">
				{title.length === 0 ||
				markdown.length === 0 ||
				markdown === "# Write Markdown" ? (
					<button
						type="button"
						className="inline-flex items-center p-1.5 text-sm font-semibold text-white rounded-full bg-[#068932] border border-transparent cursor-default gap-x-2 e">
						Publish
					</button>
				) : (
					<button
						type="button"
						onClick={() => {
							postBlog(id, title, markdown, true);
						}}
						className="inline-flex items-center rounded-full p-1.5 text-sm font-semibold text-white bg-teal-400 border border-transparent  gap-x-2 hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none">
						Publish
					</button>
				)}
				{title.length === 0 ||
				markdown.length === 0 ||
				markdown === "# Write Markdown" ? (
					<button
						type="button"
						className="inline-flex cursor-default items-center p-1.5 rounded-full text-sm font-semibold text-white bg-black border border-transparent  gap-x-2">
						Save to draft
					</button>
				) : (
					<button
						type="button"
						onClick={() => {
							postBlog(id, title, markdown, false);
						}}
						className="inline-flex items-center p-1.5 rounded-full text-sm font-semibold text-white bg-gray-400 border border-transparent  gap-x-2 hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none">
						Save to draft
					</button>
				)}
			</div>
		</div>
	);
}
