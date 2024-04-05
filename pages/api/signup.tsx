import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient({
	log: ["query", "info", "warn", "error"],
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res;
	}

	try {
		const { email, password, name } = req.body;
		const hashedPassword = bcrypt.hashSync(password, 8);

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});

		res.status(201).json({ message: "User created", user });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}
