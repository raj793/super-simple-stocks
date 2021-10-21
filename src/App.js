import React, { useState } from 'react';
import { CustomInput, CustomSelect, Button } from './components';
import useCalculate from './hooks/useCalculate';
import { stocks } from './constants/stocks';

import './App.css';

function App() {
	const [transactions, calculated, setTransactions, calculateData] =
		useCalculate();
	const [input, setInput] = useState('');
	const [stock, setStock] = useState({});
	const [] = useState();

	const customSelectHandler = e => {
		if (e.target.value === 'default') {
			setStock({});
		}
		setStock(JSON.parse(e.target.value));
	};

	const onCalculate = () => {
		calculateData(input, stock);
	};

	const onTrade = () => {};

	return (
		<div className='App'>
			<header>Simple Stocks</header>
			<div>
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
				<CustomInput
					type='number'
					placeholder='Enter price'
					value={input}
					onChange={e => {
						setInput(parseFloat(e.target.value));
					}}
				/>
				<Button disabled={!stock?.symbol} onClick={onCalculate}>
					Calculate
				</Button>
				<Button disabled={!stock?.symbol} onClick={onTrade}>
					Trade
				</Button>
			</div>
			{Object.keys(calculated).length > 0 && (
				<div>
					PE: {calculated.pe} DY: {calculated.dy}
				</div>
			)}
		</div>
	);
}

export default App;
