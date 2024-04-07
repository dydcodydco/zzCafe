import Link from "next/link";
import Map from "@/components/map";
import RandomCafeInfo from "@/components/randomCafeInfo";

export default function Component() {
	return (
		<div className='flex flex-col min-h-[100dvh]'>
			<main className='flex-1'>
				<section className='w-full py-8 pb-7 md:py-12 lg:py-20'>
					<div className='container flex flex-col items-center justify-center space-y-4 text-center px-4 md:px-6'>
						<div className='space-y-2'>
							<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
								Welcome to the ZZCafe
							</h1>
							<p className='mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
								주변의 카페를 찾아보세요.
								<br />
								카페 리뷰를 하고 기록해보세요.
								<br />
								나만의 카페 리스트를 만들어보세요.
								<br />
								고민이 되신다면 오늘의 카페는 어떨까요?
							</p>
						</div>
					</div>
				</section>

				<section className='w-full'>
					<Map />
				</section>
				<RandomCafeInfo />
			</main>
			<footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
				<p className='text-xs text-gray-500 dark:text-gray-400'>
					© 2024 ZZCAFE Inc. All rights reserved.
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
