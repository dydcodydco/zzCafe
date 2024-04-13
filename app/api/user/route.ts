import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
	name: string;
	email: string;
	password: string;
}

export async function POST(request: Request) {
	const body: RequestBody = await request.json();
	const { name, email, password } = body;

	// 먼저 이메일이 이미 존재하는지 확인합니다.
	const existingUser = await prisma.user.findUnique({
		where: {
			email: body.email,
		},
	});

	if (existingUser) {
		throw new Error("이미 사용 중인 이메일입니다.");
	}

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: await bcrypt.hash(body.password, 10),
		},
	});

	// user 객체에서 password 값은 제외
	const { password: hash, ...result } = user;
	return new Response(JSON.stringify(result));
}
