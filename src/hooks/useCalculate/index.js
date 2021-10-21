import React, { useState, useEffect } from 'react';
import { calculateDividendYield, calculatePeRatio } from '../../utils/utils';

const useCalculate = (initValue = []) => {
	const [transactions, setTransactions] = useState(initValue);
	const [calculated, setCalculated] = useState({});

	const calculateData = (price, stock) => {
		if (!price && price <= 0) return;

		const { lastDividend, fixedDividend, parValue } = stock;

		const dy = calculateDividendYield(
			lastDividend,
			fixedDividend,
			parValue,
			price
		);
		const pe = calculatePeRatio(price, lastDividend);

		setCalculated({
			dy: dy,
			pe: pe,
		});
	};

	return [transactions, calculated, setTransactions, calculateData];
};

export default useCalculate;
