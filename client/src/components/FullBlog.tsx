import { Link } from "react-router-dom";
import { Blog } from "../hooks";
import Avatar from "./Avatar";
import ShareBtn from "./ShareBtn";
import Preview from "./Preview";

export const FullBlog = ({ blog }: { blog: Blog }) => {
	return (
		<div className="flex justify-center pt-16 font-head">
			<div className="justify-center p-3 md:w-3/4 lg:w-2/3">
				<div className="pb-3 font-serif text-5xl font-extrabold ">
					{blog.title}
				</div>
				<div className="flex justify-between ">
					<div>
						<div className="flex items-center gap-3">
							<Link
								to={"/user/" + blog.authorId}
								className="flex items-center gap-3 ">
								<Avatar name={blog.author.name} />
								<div className="text-lg font-semibold first-letter:uppercase">
									{blog.author.name}
								</div>
							</Link>
							<div className="text-slate-400">&#x2022;</div>
							<div className="flex gap-2 text-slate-500">
								<div>Published on</div>
								<div>
									{blog.postedOn.substring(
										0,
										blog.postedOn.indexOf(",")
									)}
								</div>

								<div className="text-slate-400">&#x2022;</div>
								<div className="px-3 py-0 text-white rounded-full bg-[#068932] cursor-default">
									{`${
										Math.ceil(blog.content.length / 500) > 1
											? Math.ceil(
													blog.content.length / 500
											  ) + " minutes read"
											: "1 minute read"
									} `}
								</div>
							</div>
						</div>
					</div>
					<ShareBtn link={window.location.href}></ShareBtn>
				</div>
				<div className="p-3 border-b"></div>
				<div className="font-serif text-xl prose scale-x-90 scale-y-95 text-slate-800">
					<Preview text={blog.content} />
				</div>
			</div>
		</div>
	);
};
