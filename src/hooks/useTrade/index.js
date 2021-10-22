import { useState, useEffect, useRef } from 'react';
import {
	calculateVolumeWeightedPrice,
	getTimestampFromPast,
	calculateGeometricMean,
} from '../../utils/utils';

const useTrade = () => {
	const [transactions, setTransactions] = useState([]);
	/* VWSP - Volume Weighted Stock Price */
	const [vwsp, setVwsp] = useState(0);
	/* GM - Geometric Mean */
	const [gm, setGm] = useState(0);
	let timer = useRef(null);

	const updateVWP = () => {
		const filteredTransactions = transactions.filter(
			x => x.ts > getTimestampFromPast(15)
		);
		const data = calculateVolumeWeightedPrice(filteredTransactions);
		setVwsp(data);
	};

	useEffect(() => {
		updateVWP();
		const gmData = calculateGeometricMean(transactions);
		setGm(gmData);
	}, [transactions]);

	//Keeps updating data for the last 15 minutes, every minute
	useEffect(() => {
		timer.current = setInterval(() => {
			updateVWP();
		}, 1 * 60000);
		return () => {
			clearInterval(timer.current);
		};
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

	return [vwsp, gm, processTransaction];
};

export default useTrade;
