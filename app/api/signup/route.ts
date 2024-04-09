import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient({
	log: ["query", "info", "warn", "error"],
});

export async function POST(req: Request) {
	console.log(req);
	try {
		const requestBody = await req.json();
		const { email, password, name } = requestBody;
		const hashedPassword = bcrypt.hashSync(password, 8);

		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});

		return NextResponse.json({
			message: "User created",
			user,
		});
		// res.status(201).json({ message: "User created", user });
	} catch (error) {
		return NextResponse.json({
			message: "Internal server error",
		});
	}
}
