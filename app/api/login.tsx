import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
	const { email, password } = req.body;

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (user && bcrypt.compareSync(password, user.password)) {
		// JWT 생성 로직 (환경 변수에 JWT_SECRET 추가 필요)
		const jwtSecret = process.env.JWT_SECRET;

		if (!jwtSecret) {
			throw new Error("JWT_SECRET is not defined in the environment variables");
		}
		const token = jwt.sign({ id: user.id }, jwtSecret, {
			expiresIn: "8h",
		});
		res.status(200).json({ message: "Logged in successfully", token });
	} else {
		res.status(400).json({ error: "Invalid email or password" });
	}
}
