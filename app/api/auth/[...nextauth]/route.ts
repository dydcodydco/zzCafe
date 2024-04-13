import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
	providers: [
		// ID, PW 로그인 방식
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "이메일" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
				});
				const user = await res.json();
				console.log("$$$user: ", user);

				if (user) {
					// Any object returned will be saved in `user` property of the JWT
					return user;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;

					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
});

export { handler as GET, handler as POST };
