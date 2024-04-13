export default function Loading() {
	return (
		<div
			className={
				"w-full h-full bg-white fixed top-0 left-0 flex justify-center items-center"
			}
		>
			<svg
				className='animate-spin'
				height='30'
				width={"30"}
				fill='#000'
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 512 512'
			>
				<path d='M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z' />
			</svg>
		</div>
	);
}