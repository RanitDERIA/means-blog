import Preview from "./Preview";

export default function EditorPreview({
	title,
	markdown,
	setTitle,
	setMarkdown,
}: {
	title: string;
	markdown: string;
	setTitle: any;
	setMarkdown: any;
}) {
	return (
		<div>
			<div className="flex justify-center">
				<div className="grid w-screen grid-cols-1 p-3 sm:grid-cols-3 lg:grid-cols-2">
					<div className="flex flex-col h-screen col-span-1 p-3 pr-5 mb-32 sm:m-0 sm:border-r-2 sm:col-span-2 lg:col-span-1">
						<div className="flex flex-col h-fit">
							<div className="pb-3 mb-10 text-3xl font-bold border-b-4 text-slate-500">
								Editor:
							</div>

							<textarea
								onChange={(e) => {
									setTitle(e.target.value);
								}}
								value={title === "" ? "" : title}
								// defaultValue={}
								placeholder="Title"
								maxLength={150}
								className="p-3 mb-10 text-xl border resize-none min-h-28"
							/>
							<textarea
								className="block min-h-full p-2 border resize-none min"
								style={{ height: "auto" }}
								placeholder="Write Markdown here to display it"
								onChange={(e) => {
									setMarkdown(e.target.value);
								}}
								value={markdown}></textarea>
						</div>
					</div>
					<div className="h-screen col-span-1 p-3 pl-5 overflow-y-auto sm:col-span-1 lg:col-span-1">
						<div>
							<div className="pb-3 mb-4 text-3xl font-bold border-b-4 text-slate-500">
								Preview:
							</div>
							<div className="flex flex-col font-serif text-4xl font-extrabold ">
								<div className="pb-3 border-b-2">{title}</div>
								<div className="pt-3 prose scale-x-90 scale-y-95">
									<Preview text={markdown}></Preview>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
