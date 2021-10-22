import React, { useState } from 'react';
import { CustomInput, CustomSelect, Button } from './components';
import useCalculate from './hooks/useCalculate';
import useTrade from './hooks/useTrade';
import { stocks } from './constants/stocks';

import './App.css';

function App() {
	const [calculated, calculateData] = useCalculate();
	const [vwsp, processTransaction] = useTrade();
	const [input, setInput] = useState('');
	const [quantity, setQuantity] = useState('');
	const [stock, setStock] = useState({});
	const [type, setType] = useState('');

	/*
    Internal component event handlers
  */

	const customSelectHandler = e => {
		if (e.target.value === 'default') {
			setStock({});
		}
		setStock(JSON.parse(e.target.value));
	};

	const typeHandler = e => {
		setType(e.target.value);
	};

	const isTradeActive = () => {
		return !(
			quantity > 0 &&
			Object.keys(stock).length > 0 &&
			input > 0 &&
			type
		);
	};

	/* 
    Transaction Process related hook callbacks
  */

	const onCalculate = () => {
		calculateData(input, stock);
	};

	const onTrade = () => {
		processTransaction(input, quantity, type, stock);
	};

	return (
		<div className='App'>
			<header>Simple Stocks</header>
			<div>
				{/* STOCK SELECT LIST */}
				<CustomSelect onChange={customSelectHandler}>
					<CustomSelect.Options value={'default'} key={'default'}>
						SELECT STOCK
					</CustomSelect.Options>
					{stocks.map(stock => {
						return (
							<CustomSelect.Options
								value={JSON.stringify(stock)}
								key={stock.symbol}
							>
								{stock.symbol}
							</CustomSelect.Options>
						);
					})}
				</CustomSelect>

				{/* STOCK PRICE INPUT */}
				<CustomInput
					type='number'
					placeholder='Enter price'
					value={input}
					onChange={e => {
						setInput(parseFloat(e.target.value));
					}}
				/>

				{/* STOCK QUANTITY INPUT */}
				<CustomInput
					type='number'
					placeholder='Enter quantity'
					value={quantity}
					onChange={e => {
						setQuantity(parseInt(e.target.value));
					}}
				/>

				{/* STOCK PRICE INPUT */}
				<CustomSelect onChange={typeHandler}>
					<CustomSelect.Options value={'default'} key={'default'}>
						BUY/SELL
					</CustomSelect.Options>

					<CustomSelect.Options value='BUY'>BUY</CustomSelect.Options>
					<CustomSelect.Options value='SELL'>
						SELL
					</CustomSelect.Options>
				</CustomSelect>

				{/* CALCULATE BUTTON */}
				<Button disabled={!stock?.symbol} onClick={onCalculate}>
					Calculate
				</Button>

				{/* TRADEE BUTTON */}
				<Button disabled={isTradeActive()} onClick={onTrade}>
					Trade
				</Button>
			</div>
			{Object.keys(calculated).length > 0 && (
				<div>
					PE: {calculated.pe} DY: {calculated.dy} VWSP: {vwsp}
				</div>
			)}
		</div>
	);
}

export default App;
