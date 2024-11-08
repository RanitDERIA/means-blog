/* eslint-disable no-var */
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";

export interface Blog {
	author: {
		name: string;
	};
	title: string;
	content: string;
	id: string;
	postedOn: string;
	published: boolean;
	authorId: string;
}

export const useBlog = ({ id }: { id: string }) => {
	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState<Blog>();

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setBlog(response.data.blog);
				setLoading(false);
			});
	}, [id]);

	return {
		loading,
		blog,
	};
};
export const useBlogs = () => {
	const [loading, setLoading] = useState(true);
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setBlogs(response.data.blogs);
				setLoading(false);
			});
	}, []);

	return {
		loading,
		blogs,
	};
};

export interface User {
	id: string;
	name: string;
	email: string;
	posts: Blog[];
}

export function useUserData(id: string) {
	const [loading, setLoading] = useState(true);
	const [userData, setuserData] = useState<User>();

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/user/${id}`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setuserData(response.data.user);
				setLoading(false);
			});
	}, []);

	return {
		loading,
		userData,
	};
}

export function useUserBoth() {
	const [loading, setLoading] = useState(true);
	const [userData, setuserData] = useState<User>();

	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/v1/blog/both`, {
				headers: {
					Authorization: localStorage.getItem("token"),
				},
			})
			.then((response) => {
				setuserData(response.data.user);
				setLoading(false);
			});
	}, []);

	return {
		loading,
		userData,
	};
}

export function useUserDetails(token: any): any {
	const base64Url = token.split(".")[1];
	var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	return JSON.parse(jsonPayload);
}

export async function useRandomQuote() {
	try {
		const response = await axios.get("https://type.fit/api/quotes");
		const quotes = response.data;

		const randomIndex = Math.floor(Math.random() * quotes.length);
		const randomQuote = quotes[randomIndex];

		return randomQuote;
	} catch (error) {
		console.error("Error fetching random quote:", error);
		return null;
	}
}
