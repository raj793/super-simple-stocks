import React, { useState } from 'react';
import { CustomInput, CustomSelect, Button, Text } from './components';
import useCalculate from './hooks/useCalculate';
import useTrade from './hooks/useTrade';
import { stocks } from './constants/stocks';

import './App.css';

function App() {
	const [calculated, calculateData] = useCalculate();
	const [vwsp, gm, processTransaction] = useTrade();
	const [input, setInput] = useState('');
	const [quantity, setQuantity] = useState('');
	const [stock, setStock] = useState({});
	const [type, setType] = useState('');

	/*
    Internal component event handlers
  */

	const stockSelectHandler = e => {
		if (e.target.value === 'default') {
			setStock({});
			return;
		}
		setStock(JSON.parse(e.target.value));
	};

	const typeHandler = e => {
		if (e.target.value === 'default') {
			setType('');
			return;
		}
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
    Transaction related hook callback handlers
  */

	const onCalculate = () => {
		calculateData(input, stock);
	};

	const onTrade = () => {
		onCalculate();
		processTransaction(input, quantity, type, stock);
	};

	return (
		<div className='App'>
			<header style={{ padding: 50 }}>
				<h2
					style={{
						width: 120,
						height: 130,
						background: '#624de3',
						color: '#FFFFFF',
					}}
				>
					Super Simple Stocks
				</h2>
			</header>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
					}}
				>
					{/* STOCK SELECT LIST */}
					<CustomSelect onChange={stockSelectHandler}>
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
						min='0'
						onChange={e => {
							setInput(parseFloat(e.target.value));
						}}
					/>

					{/* STOCK QUANTITY INPUT */}
					<CustomInput
						type='number'
						placeholder='Enter quantity'
						value={quantity}
						min='0'
						onChange={e => {
							setQuantity(parseInt(e.target.value));
						}}
					/>

					{/* TRANSACTION TYPE */}
					<CustomSelect onChange={typeHandler}>
						<CustomSelect.Options value={'default'} key={'default'}>
							BUY/SELL
						</CustomSelect.Options>

						<CustomSelect.Options value='BUY'>
							BUY
						</CustomSelect.Options>
						<CustomSelect.Options value='SELL'>
							SELL
						</CustomSelect.Options>
					</CustomSelect>
				</div>
				<div
					style={{
						padding: 50,
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '23%',
					}}
				>
					{/* CALCULATE BUTTON */}
					<Button
						disabled={!stock?.symbol || !input}
						onClick={onCalculate}
					>
						Calculate
					</Button>

					{/* TRADE BUTTON */}
					<Button disabled={isTradeActive()} onClick={onTrade}>
						Trade
					</Button>
				</div>
			</div>
			{Object.keys(calculated).length > 0 && (
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-evenly',
						alignItems: 'center',
						background: '#e7effc',
						height: '30vh',
						width: '60vw',
					}}
				>
					<div>
						<Text>Dividend Yield: {calculated.dy}</Text>
					</div>
					<div>
						<Text>P/E Ratio: {calculated.pe}</Text>
					</div>
					<div>
						<Text>
							Volume Weighted Stock Price:{' '}
							{vwsp > 0 ? vwsp : 'Trade to view data'}
						</Text>
					</div>
					<div>
						<Text>
							GBCE Share Index: {gm ? gm : 'Trade to view data'}
						</Text>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
