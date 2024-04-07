export const formatMoneyKRW = (value: number) => {
	return new Intl.NumberFormat("ko-KR").format(value);
};
