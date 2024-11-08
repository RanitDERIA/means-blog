import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import {
	signinInput,
	signupInput,
	updateUserDetailsInput,
} from "@praneethaylalvl1/medium-common";
import authMiddleware from "../authMiddleware";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

userRouter.post("/signup", async (c) => {
	const body = await c.req.json();
	const { success } = signupInput.safeParse(body);

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
		const findUser = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		});

		if (findUser) {
			c.status(411);
			return c.json({
				message: "Email already exists",
			});
		}
		console.log(findUser);
		const user = await prisma.user.create({
			data: {
				email: body.email,
				name: body.name,
				password: body.password,
			},
		});
		const jwt = await sign(
			{ id: user.id, email: body.email, name: user.name },
			c.env.JWT_SECRET
		);
		return c.json({ jwt });
	} catch (e) {
		c.status(403);
		console.log(e, "error");
		return c.json({ error: "Error while signing up" });
	}
});

userRouter.post("/signin", async (c) => {
	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);

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
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
				password: body.password,
			},
		});

		if (!user) {
			c.status(403);
			return c.json({
				error: "Incorrect credentials",
			});
		}

		const jwt = await sign(
			{
				id: user.id,
				email: user.email,
				name: user.name,
			},
			c.env.JWT_SECRET
		);
		return c.json({ jwt });
	} catch (e) {
		c.status(411);
		console.log("error", e);
		return c.json({ message: "Error signing in" });
	}
});

userRouter.put("/update", authMiddleware, async (c) => {
	const body = await c.req.json();

	const { success } = updateUserDetailsInput.safeParse(body);

	if (!success) {
		c.status(411);
		return c.json({
			message: "Invalid Inputs",
		});
	}

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const res = await prisma.user.update({
			where: {
				id: c.get("userId"),
			},
			data: body,
		});

		return c.json({
			message: "Details Updated",
		});
	} catch (error) {
		c.status(403);
		return c.json({
			message: "Internal Server Error",
		});
	}
});

userRouter.get("/:id", authMiddleware, async (c) => {
	const id = c.req.param("id");

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
			select: {
				id: true,
				name: true,
				email: true,
				posts: {
					where: {
						published: true,
					},
				},
			},
		});

		console.log(user);

		return c.json({
			user,
		});
	} catch (error) {
		console.log("Error: " + error);

		c.status(403);
		return c.json({
			message: "Internal Server Error",
		});
	}
});
