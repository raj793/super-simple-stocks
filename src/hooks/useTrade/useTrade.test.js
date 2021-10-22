import useTrade from './';
import { act, renderHook } from '@testing-library/react-hooks';

import { stocks } from '../../constants/stocks';

describe('useTrade Hook', () => {
	it('should initialize hook', async () => {
		const { result, waitFor } = renderHook(() => {
			return useTrade();
		});

		await waitFor(async () => {
			return expect(result.current[0]).toBeDefined();
		});
	});
	it('should process transaction', async () => {
		const randIntArray = jest.fn().mockReturnValueOnce(new Uint32Array(10));
		Object.defineProperty(window, 'crypto', {
			value: { getRandomValues: randIntArray },
		});
		const { result, waitFor } = renderHook(() => {
			return useTrade();
		});

		await waitFor(async () => {
			return expect(result.current[0]).toBeDefined();
		});

		act(() => {
			result.current[2](100, 50, 'BUY', stocks[4]);
		});

		expect(parseFloat(result.current[0])).toBe(100);
		expect(parseFloat(result.current[1])).toBe(100);
	});
});
