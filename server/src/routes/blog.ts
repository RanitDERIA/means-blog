import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import authMiddleware from "../authMiddleware";
import {
	blogCreateInput,
	blogUpdateInput,
} from "@praneethaylalvl1/medium-common";
import * as moment from "moment-timezone";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

blogRouter.use("/*", authMiddleware);

blogRouter.post("/", async (c) => {
	const body = await c.req.json();
	const { success } = blogCreateInput.safeParse(body);

	if (!success) {
		c.status(411);
		return c.json({
			message: "Invalid inputs",
		});
	}

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		// Get the current time in Indian Standard Time (IST)
		const indianTime = moment
			.tz("Asia/Kolkata")
			.format("D/M/YYYY, h:mm:ss");

		const blog = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: c.get("userId"),
				postedOn: indianTime,
				published: body.published,
			},
		});

		return c.json({
			message: "Blog created: " + blog.id,
		});
	} catch (error) {
		console.log("Error: ", error);
		c.status(403);
		return c.json({
			message: "Internal Server Error",
		});
	}
});

blogRouter.put("/", async (c) => {
	const body = await c.req.json();
	const { success } = blogUpdateInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "Invalid inputs",
		});
	}

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const blog = await prisma.post.update({
			where: {
				id: body.id,
				authorId: c.get("userId"),
			},
			data: {
				title: body.title,
				content: body.content,
				published: body.published,
			},
		});

		return c.json({
			message: "Blog updated Successfully: " + blog.id,
		});
	} catch (error) {
		console.log("Error: ", error);
		c.status(403);
		return c.json({
			message: "Internal Server Error",
		});
	}
});

blogRouter.get("/bulk", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const blogs = await prisma.post.findMany({
			where: {
				published: true,
			},
			select: {
				content: true,
				title: true,
				id: true,
				postedOn: true,
				published: true,
				authorId: true,
				author: {
					select: { name: true },
				},
			},
		});

		return c.json({
			blogs,
		});
	} catch (error) {
		console.log("Error: " + error);
		c.status(403);
		return c.json({ message: "Internal Server Error" });
	}
});

blogRouter.get("/both", async (c) => {
	console.log("bjsadlkfj");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: c.get("userId"),
			},
			select: {
				id: true,
				name: true,
				email: true,
				posts: true,
			},
		});
		return c.json({ user });
	} catch (error) {
		console.log("Error: ", error);
		c.status(403);
		c.json({
			message: "Internal Server Error",
		});
	}
});

blogRouter.get("/:id", async (c) => {
	const id = c.req.param("id");

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const blog = await prisma.post.findUnique({
			where: {
				id: id,
			},
			select: {
				author: {
					select: {
						name: true,
					},
				},
				content: true,
				title: true,
				id: true,
				postedOn: true,
				published: true,
				authorId: true,
			},
		});
		return c.json({ blog });
	} catch (error) {
		console.log("Error: ", error);
		c.status(403);
		c.json({
			message: "Internal Server Error",
		});
	}
});

blogRouter.delete("/:id", async (c) => {
	const id = c.req.param("id");

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const res = await prisma.post.delete({
			where: {
				id: id,
				authorId: c.get("userId"),
			},
		});
		console.log(res);
		return c.json({
			message: "Post deleted successfully",
		});
	} catch (error) {
		console.log("Error: ", error);
		c.status(403);
		return c.json({
			message: "Internal Server Error",
		});
	}
});
