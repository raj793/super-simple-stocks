import { render, screen, fireEvent } from '@testing-library/react';
import CustomInput from './';

describe('CustomInput', () => {
	it('renders', async () => {
		render(
			<CustomInput type='number' value={100} placeholder='some input' />
		);

		const input = await screen.findByPlaceholderText('some input');

		expect(input.getAttribute('value')).toBe('100');
	});

	it('invokes an event on input', async () => {
		const changeFn = jest.fn();
		render(
			<CustomInput
				type='number'
				value={100}
				placeholder='some input'
				onChange={changeFn}
			/>
		);

		const input = await screen.findByPlaceholderText('some input');

		fireEvent.change(input, {
			target: { value: 150 },
		});

		expect(changeFn).toHaveBeenCalledTimes(1);
	});
});
