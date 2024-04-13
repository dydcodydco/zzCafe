"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Form() {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();

	const onSubmit: SubmitHandler<FieldValues> = useCallback(
		async (data: FieldValues) => {
			try {
				const { email, password, name } = data;

				// api 요청을 통한 회원가입 로직 구현
				const response = await fetch("/api/user", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, password, name }),
				});

				const responseData = await response.json();
				if (response.ok) {
					console.log(`회원가입 성공`, responseData);
					signIn();
				} else {
					console.log(`회원가입 실패`, responseData.error);
					// 에러 처리 조직
				}
			} catch (e) {
				console.log(e);
			}
		},
		[router]
	);
	return (
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
	);
}
