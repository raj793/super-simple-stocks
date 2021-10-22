import { render, screen } from '@testing-library/react';
import App from './App';

test('renders', () => {
	render(<App />);
	const linkElement = screen.getByText(/Super Simple Stocks/i);
	expect(linkElement).toBeInTheDocument();
});
