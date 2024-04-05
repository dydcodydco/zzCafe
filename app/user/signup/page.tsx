"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();

	const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
		try {
			const { email, password, name } = data;

			console.log({ email, password, name });
			// api 요청을 통한 회원가입 로직 구현
			const response = await fetch("/api/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password, name }),
			});

			const responseData = await response.json();
			if (response.ok) {
				console.log("회원가입 성공", responseData);
			} else {
				console.log("회원가입 실패", responseData.error);
				// 에러 처리 조직
			}
		} catch (e) {
			console.log(e);
		}
	};
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
				<section className='w-full py-12 md:py-24 lg:py-32'>
					<div className='container flex flex-col items-center justify-center space-y-4 px-4 md:px-6'>
						<div className='mx-auto w-full max-w-sm space-y-2'>
							<form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
								<Input
									className='w-full'
									placeholder='Enter your email'
									type='email'
									{...register("email", {
										required: "이메일은 필수 입력 항목입니다.",
										pattern: {
											value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
											message: "올바른 이메일 형식이 아닙니다.",
										},
									})}
								/>
								{errors.email && <span>{errors.email.message as string}</span>}

								<Input
									className='w-full'
									placeholder='Password'
									type='password'
									{...register("password", {
										required: "비밀번호는 필수입니다.",
										minLength: {
											value: 6,
											message: "비밀번호는 6자 이상이어야 합니다.",
										},
									})}
								/>
								{errors.password && (
									<span>{errors.password.message as string}</span>
								)}

								<Input
									className='w-full'
									placeholder='name'
									type='text'
									{...register("name", { required: true })}
								/>
								{errors.name && <span>이름은 필수 입력 항목입니다.</span>}

								<Button className='w-full' type='submit'>
									Sign Up
								</Button>
							</form>
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

function MountainIcon({ className }: { className: string }) {
	return (
		<svg
			{...{ className }}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='m8 3 4 8 5-5 5 15H2L8 3z' />
		</svg>
	);
}
