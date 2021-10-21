import React, { useState, useEffect } from 'react';

const useCalculate = (initValue = []) => {
	const [transactions, setTransactions] = useState(initValue);

	return [transactions, setTransactions];
};

export default useCalculate;
