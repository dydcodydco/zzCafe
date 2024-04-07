import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Map from "@/components/map";

export default function Component() {
	return (
		<div className='flex flex-col min-h-[100dvh]'>
			<main className='flex-1'>
				<section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
					<div className='container flex flex-col items-center justify-center space-y-4 text-center px-4 md:px-6'>
						<div className='space-y-2'>
							<h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
								Welcome to the ZZCafe
							</h1>
							<p className='mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
								주변의 카페를 찾아보세요.
								<br />
								카페 리뷰를 하고 기록해주세요
								<br />
								나만의 카페 리스트를 만들어보세요.
								<br />
								원하시는데가 없다면 오늘을 카페를 소개해드립니다.
							</p>
						</div>
					</div>
				</section>

				<section className='w-full'>
					<Map />
				</section>

				<section className='w-full py-12 md:py-24 lg:py-32'>
					<div className='container grid items-center justify-center gap-6 px-4 md:px-6'>
						<div className='space-y-2'>
							<h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
								Today&apos;s Specials
							</h2>
							<p className='mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
								Indulge in our chef&apos;s creations. Each dish is a work of
								art, made with the finest ingredients and a dash of passion.
							</p>
						</div>
						<div className='mx-auto grid max-w-5xl items-start gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-12'>
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
				<section className='w-full py-12 md:py-24 lg:py-32 border-t'>
					<div className='container grid items-center justify-center gap-4 px-4 text-center md:px-6'>
						<div className='space-y-3'>
							<h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
								Experience the workflow the best frontend teams love.
							</h2>
							<p className='mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
								Let your team focus on shipping features instead of managing
								infrastructure with automated CI/CD.
							</p>
						</div>
						<div className='mx-auto w-full max-w-sm space-y-2'>
							<form className='flex space-x-2'>
								<Input
									className='max-w-lg flex-1'
									placeholder='Enter your email'
									type='email'
								/>
								<Button type='submit'>Sign Up</Button>
							</form>
							<p className='text-xs text-gray-500 dark:text-gray-400'>
								Sign up to get notified when we launch.
								<Link className='underline underline-offset-2' href='#'>
									Terms & Conditions
								</Link>
							</p>
						</div>
					</div>
				</section>
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
