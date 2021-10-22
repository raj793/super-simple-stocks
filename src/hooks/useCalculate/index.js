import React, { useState, useEffect } from 'react';
import { calculateDividendYield, calculatePeRatio } from '../../utils/utils';

const useCalculate = () => {
	const [calculated, setCalculated] = useState({});

	const calculateData = (price, stock) => {
		if (!price || price <= 0) return;

		const { lastDividend, fixedDividend, parValue, type } = stock;

		const dy = calculateDividendYield(
			lastDividend,
			fixedDividend,
			parValue,
			price,
			type
		);

		const pe = calculatePeRatio(price, lastDividend);

		setCalculated({
			dy: dy,
			pe: pe,
		});
	};

	return [calculated, calculateData];
};

export default useCalculate;
