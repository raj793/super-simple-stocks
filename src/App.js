import React from 'react';
import './App.css';

import { CustomInput, CustomSelect, Button } from './components';

import { stocks } from './constants/stocks';

function App() {
	return (
		<div className='App'>
			<header>Simple Stocks</header>
			<div>
				<CustomSelect>
					{stocks.map(stock => {
						return (
							<CustomSelect.Options
								value={stock.symbol}
								key={stock.symbol}
							>
								{stock.symbol}
							</CustomSelect.Options>
						);
					})}
				</CustomSelect>
				<CustomInput type='number' />
				<Button>Calculate</Button>
			</div>
		</div>
	);
}

export default App;
