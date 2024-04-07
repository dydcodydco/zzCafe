function formatMeterWithComma(value: number) {
	return new Intl.NumberFormat("en-US").format(value) + "m";
}
