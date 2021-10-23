import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
	it('renders', () => {
		render(<App />);
		const linkElement = screen.getByText(/Super Simple Stocks/i);
		expect(linkElement).toBeInTheDocument();
	});

	it('remains disabled on empty inputs', () => {
		render(<App />);
		const calculateButton = screen.getByTestId('button-calculate');
		const tradeButton = screen.getByTestId('button-trade');

		expect(calculateButton).toBeDisabled();
		expect(tradeButton).toBeDisabled();
	});

	it('activates calculate button on valid inputs', () => {
		render(<App />);
		const calculateButton = screen.getByTestId('button-calculate');

		expect(calculateButton).toBeDisabled();

		const stockSelect = screen.getByTestId('stock-list');
		const priceInput = screen.getByTestId('input-price');

		fireEvent.change(stockSelect, {
			target: {
				value: '{"symbol":"TEA","type":"COMMON","lastDividend":0,"parValue":100}',
			},
		});

		fireEvent.change(priceInput, {
			target: {
				value: 100,
			},
		});

		expect(calculateButton).toBeEnabled();
	});

	it('activates trade button on valid inputs', () => {
		render(<App />);
		const tradeButton = screen.getByTestId('button-trade');

		expect(tradeButton).toBeDisabled();

		const stockSelect = screen.getByTestId('stock-list');
		const typeSelect = screen.getByTestId('type-list');
		const priceInput = screen.getByTestId('input-price');
		const quantityInput = screen.getByTestId('input-quantity');

		fireEvent.change(stockSelect, {
			target: {
				value: '{"symbol":"TEA","type":"COMMON","lastDividend":0,"parValue":100}',
			},
		});

		fireEvent.change(priceInput, {
			target: {
				value: 100,
			},
		});

		fireEvent.change(quantityInput, {
			target: {
				value: 100,
			},
		});

		fireEvent.change(typeSelect, {
			target: {
				value: 'BUY',
			},
		});

		expect(tradeButton).toBeEnabled();
	});

	it('calculates values on calculate', () => {
		const { debug } = render(<App />);
		const calculateButton = screen.getByTestId('button-calculate');

		expect(calculateButton).toBeDisabled();

		const stockSelect = screen.getByTestId('stock-list');
		const priceInput = screen.getByTestId('input-price');

		fireEvent.change(stockSelect, {
			target: {
				value: '{"symbol":"TEA","type":"COMMON","lastDividend":0,"parValue":100}',
			},
		});

		fireEvent.change(priceInput, {
			target: {
				value: 100,
			},
		});

		expect(calculateButton).toBeEnabled();

		fireEvent.click(calculateButton);

		expect(screen.getByText('Dividend Yield: 0')).toBeInTheDocument();
		expect(screen.getByText('P/E Ratio: 0')).toBeInTheDocument();
		expect(
			screen.getByText('Volume Weighted Stock Price: Trade to view data')
		).toBeInTheDocument();
		expect(
			screen.getByText('GBCE Share Index: Trade to view data')
		).toBeInTheDocument();
	});

	it('trades on calculate', () => {
		render(<App />);

		const randIntArray = jest.fn().mockReturnValueOnce(new Uint32Array(10));
		Object.defineProperty(window, 'crypto', {
			value: { getRandomValues: randIntArray },
		});

		const tradeButton = screen.getByTestId('button-trade');

		expect(tradeButton).toBeDisabled();

		const stockSelect = screen.getByTestId('stock-list');
		const typeSelect = screen.getByTestId('type-list');
		const priceInput = screen.getByTestId('input-price');
		const quantityInput = screen.getByTestId('input-quantity');

		fireEvent.change(stockSelect, {
			target: {
				value: '{"symbol":"TEA","type":"COMMON","lastDividend":0,"parValue":100}',
			},
		});

		fireEvent.change(priceInput, {
			target: {
				value: 100,
			},
		});

		fireEvent.change(quantityInput, {
			target: {
				value: 100,
			},
		});

		fireEvent.change(typeSelect, {
			target: {
				value: 'BUY',
			},
		});

		expect(tradeButton).toBeEnabled();

		fireEvent.click(tradeButton);

		expect(screen.getByText('Dividend Yield: 0')).toBeInTheDocument();
		expect(screen.getByText('P/E Ratio: 0')).toBeInTheDocument();
		expect(
			screen.getByText('Volume Weighted Stock Price: 100.00')
		).toBeInTheDocument();
		expect(
			screen.getByText('GBCE Share Index: 100.00')
		).toBeInTheDocument();
	});
});
