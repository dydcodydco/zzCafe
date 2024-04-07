import Form from "@/components/form";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "회원가입 화면",
};

export default function SignUp() {
	return (
		<div className='flex flex-col min-h-[100dvh]'>
			<main className='flex-1'>
				<section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
					<div className='container flex flex-col items-center justify-center space-y-4 text-center px-4 md:px-6'>
						<div className='space-y-2'>
							<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
								회원가입
							</h1>
						</div>
					</div>
				</section>
				<Form />
			</main>
			<footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
				<p className='text-xs text-gray-500 dark:text-gray-400'>
					© 2024 Acme Inc. All rights reserved.
				</p>
				<nav className='sm:ml-auto flex gap-4 sm:gap-6'>
					<Link className='text-xs hover:underline underline-offset-4' href='#'>
						Terms of Service
					</Link>
					<Link className='text-xs hover:underline underline-offset-4' href='#'>
						Privacy
					</Link>
				</nav>
			</footer>
		</div>
	);
}
