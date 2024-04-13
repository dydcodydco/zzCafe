"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavUserMenu() {
	const { data: session } = useSession();
	return (
		<>
			{session?.user ? (
				<DropdownMenu>
					<DropdownMenuTrigger className='cursor-pointer hover:underline'>
						{session.user.name}
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>{session.user.name}</DropdownMenuItem>
						<DropdownMenuItem>{session.user.email}</DropdownMenuItem>
						<DropdownMenuItem onClick={() => signOut()}>
							로그아웃
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<>
					<span
						className='text-sm font-medium hover:underline underline-offset-4'
						onClick={() => signIn()}
					>
						SIGNIN
					</span>
					<Link
						className='text-sm font-medium hover:underline underline-offset-4'
						href='/user/signup'
					>
						SIGNUP
					</Link>
				</>
			)}
		</>
	);
}
