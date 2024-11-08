import Appbar from "../components/Appbar";
import Avatar from "../components/Avatar";
import BlogCard from "../components/BlogCard";
import { useUserBoth } from "../hooks";

export default function UserBlogs() {
	const { loading, userData } = useUserBoth();
	if (loading) {
		return (
			<div className="font-head">
				<Appbar write={true}></Appbar>;
				<div className="flex justify-center pt-16">
					<div className="flex flex-col justify-center w-5/6 gap-7 lg:w-1/2 md:w-2/3">
						<p
							className="h-4 bg-gray-200 rounded-full"
							style={{ width: "40%" }}></p>

						<ul className="mt-5 space-y-3">
							<li className="w-full h-4 bg-gray-200 rounded-full"></li>
							<li className="w-full h-4 bg-gray-200 rounded-full"></li>
							<li className="w-full h-4 bg-gray-200 rounded-full"></li>
							<li className="w-full h-4 bg-gray-200 rounded-full"></li>
						</ul>
						<p
							className="h-4 bg-gray-200 rounded-full"
							style={{ width: "40%" }}></p>

						<ul className="mt-5 space-y-3">
							<li className="w-full h-4 bg-gray-200 rounded-full"></li>
							<li className="w-full h-4 bg-gray-200 rounded-full"></li>
							<li className="w-full h-4 bg-gray-200 rounded-full"></li>
							<li className="w-full h-4 bg-gray-200 rounded-full"></li>
						</ul>
						<p
							className="h-4 bg-gray-200 rounded-full"
							style={{ width: "40%" }}></p>

						<ul className="mt-5 space-y-3">
							<li className="w-full h-4 bg-gray-200 rounded-full"></li>
							<li className="w-full h-4 bg-gray-200 rounded-full"></li>
							<li className="w-full h-4 bg-gray-200 rounded-full"></li>
							<li className="w-full h-4 bg-gray-200 rounded-full"></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="font-head">
			<div>
				<Appbar write={true} />
				<div>
					<div className="p-6 px-32 overflow-y-auto text-2xl font-bold first-letter:uppercase">
						All :
					</div>
					<div className="grid pt-6 lg:grid-cols-10">
						<div className="col-span-7 border-r">
							<div className="flex justify-center">
								<div className="flex flex-col justify-center w-5/6 max-w-screen-lg gap-7 md:w-2/3">
									{userData?.posts.map((blog) => {
										return (
											<div>
												<div
													className={` font-bold text-lg`}>
													{blog.published
														? "Published"
														: "Not published"}
												</div>
												<BlogCard
													authorId={blog.authorId}
													key={blog.id}
													id={blog.id}
													authorName={userData.name}
													content={blog.content}
													title={blog.title}
													publishedDate={blog.postedOn.substring(
														0,
														8
													)}
												/>
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<div className="hidden p-3 px-10 lg:col-span-3 lg:block">
							<div className="pb-8 text-slate-500">Author: </div>
							<div className="flex items-center gap-5 ">
								<Avatar
									size="big"
									name={userData?.name!}></Avatar>
								<div className="text-3xl font-extrabold text-slate-800 first-letter:uppercase">
									{userData?.name}
								</div>
							</div>
							<div className="pl-14">{userData?.email}</div>
							<div className="pt-6 text-lg font-medium">
								Total Blogs: {userData?.posts.length}
								<br />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
