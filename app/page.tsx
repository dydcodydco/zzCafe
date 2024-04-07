"use client";
import Link from "next/link";
import Map from "@/components/map";
import { useRecoilValue } from "recoil";
import { randomCafeState } from "@/store/inex";

export default function Component() {
	const rancomCafe = useRecoilValue(randomCafeState);
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

				<section className='w-full pt-7 pb-12 md:py-24'>
					<div className='container grid items-center justify-center gap-6 px-4 md:px-6'>
						<div className='space-y-2'>
							<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
								Today&apos;s Specials {rancomCafe?.place_name}
							</h2>
							<p className='mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
								Indulge in our chef&apos;s creations. Each dish is a work of
								art, made with the finest ingredients and a dash of passion.
							</p>
						</div>
						<div className='mx-auto grid max-w-5xl items-start gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-12'>
							<div className='flex flex-col items-start space-y-2'>
								<h3 className='text-xl font-bold'>
									주소 / 홈페이지 / 전화번호
								</h3>
								<p className='text-gray-500 dark:text-gray-400'>
									{rancomCafe?.address_name}
									<br />
									<Link href={rancomCafe?.place_url || "/"} target='_blank'>
										{rancomCafe?.place_url}
									</Link>
									<br />
									<a href={`tel:+${rancomCafe?.phone}`}>{rancomCafe?.phone}</a>
								</p>
							</div>
							<div className='flex flex-col items-start space-y-2'>
								<h3 className='text-xl font-bold'>거리 / 택시비</h3>
								<p className='text-gray-500 dark:text-gray-400'>
									{rancomCafe?.distance} | {rancomCafe?.taxiFee}원
								</p>
							</div>
							<div className='flex flex-col items-start space-y-2'>
								<h3 className='text-xl font-bold'>Cappuccino</h3>
								<p className='text-gray-500 dark:text-gray-400'>
									Smooth and velvety. The perfect pick-me-up.
								</p>
								<span className='font-bold'>$3.99</span>
							</div>
							<div className='flex flex-col items-start space-y-2'>
								<h3 className='text-xl font-bold'>Croissant</h3>
								<p className='text-gray-500 dark:text-gray-400'>
									Flaky layers of buttery goodness.
								</p>
								<span className='font-bold'>$2.49</span>
							</div>
							<div className='flex flex-col items-start space-y-2'>
								<h3 className='text-xl font-bold'>Avocado Toast</h3>
								<p className='text-gray-500 dark:text-gray-400'>
									Crunchy sourdough topped with creamy avocado.
								</p>
								<span className='font-bold'>$7.99</span>
							</div>
							<div className='flex flex-col items-start space-y-2'>
								<h3 className='text-xl font-bold'>Blueberry Pancakes</h3>
								<p className='text-gray-500 dark:text-gray-400'>
									Light and fluffy pancakes bursting with juicy blueberries.
								</p>
								<span className='font-bold'>$5.99</span>
							</div>
							<div className='flex flex-col items-start space-y-2'>
								<h3 className='text-xl font-bold'>Club Sandwich</h3>
								<p className='text-gray-500 dark:text-gray-400'>
									Layers of ham, turkey, bacon, lettuce, and tomato with a zesty
									mayo.
								</p>
								<span className='font-bold'>$9.99</span>
							</div>
							<div className='flex flex-col items-start space-y-2'>
								<h3 className='text-xl font-bold'>Fruit Parfait</h3>
								<p className='text-gray-500 dark:text-gray-400'>
									Yogurt layered with granola and fresh berries.
								</p>
								<span className='font-bold'>$4.99</span>
							</div>
						</div>
					</div>
				</section>
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
