import React, { useState, useEffect } from 'react';
import {
	calculateVolumeWeightedPrice,
	getTimestampFromPast,
} from '../../utils/utils';

const useTrade = () => {
	const [transactions, setTransactions] = useState([]);
	/* VWSP - Volume Weighted Stock Price */
	const [vwsp, setVwsp] = useState(0);

	useEffect(() => {
		const filteredTransactions = transactions.filter(
			x => x.ts > getTimestampFromPast(15)
		);
		const data = calculateVolumeWeightedPrice(filteredTransactions);
		setVwsp(data);
	}, [transactions]);

	const processTransaction = (input, quantity, type, stock) => {
		setTransactions(transaction => {
			return [
				...transaction,
				{
					id: window.crypto
						.getRandomValues(new Uint32Array(10))[0]
						.toString(),
					ts: Date.now(),
					quantity: quantity,
					type: type,
					price: input,
					symbol: stock.symbol,
				},
			];
		});
	};

	return [vwsp, processTransaction];
};

export default useTrade;
