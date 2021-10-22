import { render, screen, fireEvent } from '@testing-library/react';
import Button from './';

describe('Button', () => {
	it('renders', () => {
		render(<Button>Hello</Button>);

		const button = screen.getByRole('button');

		expect(button.getAttribute('type')).toBe('button');
		expect(button).toHaveTextContent('Hello');
	});

	it('invokes on click', () => {
		const clickFn = jest.fn();
		render(<Button onClick={clickFn}>Hello</Button>);

		const button = screen.getByRole('button');

		fireEvent.click(button);
		expect(clickFn).toHaveBeenCalledTimes(1);
	});
});
