export const calculateDividendYield = (
	lastDividend,
	fixedDividend,
	parValue,
	price
) => {
	if (fixedDividend) {
		return roundToDecimals((fixedDividend * parValue) / price, 2);
	} else if (lastDividend > 0) {
		return roundToDecimals(lastDividend / price, 2);
	}

	return 0;
};

export const calculatePeRatio = (price, dividend) => {
	if (dividend <= 0) {
		return 0;
	}

	return roundToDecimals(price / dividend, 2);
};

const roundToDecimals = (num, decimals) => {
	return parseFloat(num).toFixed(decimals);
};
