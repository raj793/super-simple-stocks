import useCalculate from './';
import { act, renderHook } from '@testing-library/react-hooks';

import { stocks } from '../../constants/stocks';

describe('useCalculate Hook', () => {
	it('should initialize hook', async () => {
		const { result, waitFor } = renderHook(() => {
			return useCalculate();
		});

		await waitFor(async () => {
			return expect(result.current[0]).toBeDefined();
		});
	});
	it('should calculate P/E and Dividend Yield', async () => {
		const { result, waitFor } = renderHook(() => {
			return useCalculate();
		});

		await waitFor(async () => {
			return expect(result.current[0]).toBeDefined();
		});

		act(() => {
			result.current[1](100, stocks[4]);
		});

		expect(parseFloat(result.current[0].dy)).toBe(0.13);
		expect(parseFloat(result.current[0].pe)).toBe(7.69);
	});
	it('should handle case for 0 input', async () => {
		const { result, waitFor } = renderHook(() => {
			return useCalculate();
		});

		await waitFor(async () => {
			return expect(result.current[0]).toBeDefined();
		});

		act(() => {
			result.current[1](0, stocks[0]);
		});

		expect(Object.keys(result.current[1]).length).toBe(0);
	});
});
