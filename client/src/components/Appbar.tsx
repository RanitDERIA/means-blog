import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Logo from "./Logo";
import { useUserDetails } from "../hooks";
import { useState, useRef, useEffect } from "react";
import Logout from "./Logout";

export default function Appbar({ write = true }: { write: boolean }) {
	const userDetails = useUserDetails(localStorage.getItem("token"));
	const [hover, setHover] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setHover(false);
			}
		};

		window.addEventListener("click", handleClickOutside);
		return () => {
			window.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div
			className="h-16 p-2 px-10 border-b bg-[#122023]"
			title="home">
			<div className="flex justify-between ">
				<Link
					className="flex text-3xl text-white font-logo font-thik"
					to={"/blogs"}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 mr-3 text-[#068932]">
						<path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
						<path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
						<path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
					</svg>
					MEANS
				</Link>
				<div className="flex items-center gap-10">
					{write ? (
						<Link to={"/write"}>
							<div className="flex items-center gap-1 font-light cursor-pointer">
								<div className="text-white">Write</div>

								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									className="text-white"
									aria-label="Write">
									<path
										d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
										fill="currentColor"></path>
									<path
										d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
										stroke="currentColor"></path>
								</svg>
							</div>
						</Link>
					) : (
						""
					)}
					<div style={{ position: "relative" }}>
						{!hover ? (
							<div className="flex items-center gap-3">
								<Avatar
									name={userDetails.name}
									size="big"
								/>
								<div className="flex justify-center gap-1 cursor-pointer">
									<div
										onClick={() => {
											setHover(!hover);
										}}
										className="border-b-4 first-letter:uppercase text-white">
										{userDetails.name}
										<span className="relative bottom-0 font-bold">
											&#8964;
										</span>
									</div>
								</div>
							</div>
						) : (
							<div
								className="dropdown-content"
								ref={dropdownRef}>
								<div
									onClick={() => {
										setHover(!hover);
									}}
									className="flex items-center gap-3">
									<Avatar
										name={userDetails.name}
										size="big"
									/>
									<div className="flex justify-center gap-1 cursor-pointer text-white">
										<div className="border-b-4 border-[#068932] first-letter:uppercase">
											{userDetails.name}{" "}
											<span className="relative bottom-0 font-bold">
												&#8964;
											</span>
										</div>
										<div className="relative bottom-0 font-bold"></div>
									</div>
								</div>
								<div className="absolute bg-white dropdown-options top-12">
									<div className="flex flex-col gap-3 py-3 pl-3 pr-10 border rounded-md shadow-lg text-nowrap">
										<Link to={"/your-blogs"}>
											<div>Your Blogs</div>
										</Link>
										<div>
											<Link to={"/settings"}>
												<div className="cursor-pointer">
													Settings
												</div>
											</Link>
										</div>
										<div className="pt-1 -mt-1 border-t">
											<Logout></Logout>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>{" "}
				</div>
			</div>
		</div>
	);
}
