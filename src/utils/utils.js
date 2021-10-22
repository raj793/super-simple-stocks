import { types } from '../constants/stocks';

export const calculateDividendYield = (
	lastDividend,
	fixedDividend,
	parValue,
	price,
	type
) => {
	if (type === types.preferred && price) {
		return roundToDecimals((fixedDividend * parValue) / price, 2);
	} else if (lastDividend > 0) {
		return roundToDecimals(lastDividend / price, 2);
	}

	return 0;
};

export const calculatePeRatio = (price, dividend) => {
	if (dividend <= 0 || price <= 0) {
		return 0;
	}

	return roundToDecimals(price / dividend, 2);
};

export const calculateVolumeWeightedPrice = transactions => {
	let quantitySum = 0;
	let tradedPriceQuantitySum = 0;

	transactions.forEach(transaction => {
		quantitySum += transaction.quantity;
		tradedPriceQuantitySum += transaction.quantity * transaction.price;
	});

	if (quantitySum <= 0 || tradedPriceQuantitySum <= 0) return 0;

	return roundToDecimals(tradedPriceQuantitySum / quantitySum, 2);
};

//Does the same thing, but prevents overflow for large datasets
export const calculateGeometricMean = transactions => {
	if (transactions.length <= 0) return;
	let sum = 0;

	transactions.forEach(transaction => {
		sum += Math.log(transaction.price);
	});

	sum = sum / transactions.length;
	sum = Math.exp(sum);

	return roundToDecimals(sum, 2);
};

export const getTimestampFromPast = minutes => {
	/* 1 Minute = 60000 ms */
	return Date.now() - minutes * 60000;
};

const roundToDecimals = (num, decimals) => {
	return parseFloat(num).toFixed(decimals);
};
