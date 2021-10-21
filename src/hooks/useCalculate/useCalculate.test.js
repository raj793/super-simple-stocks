import useCalculate from './';
import { stocks } from '../../constants/stocks';
import { act, renderHook } from '@testing-library/react-hooks';

describe('useCalculate Hook', () => {
	it('initializes hook', async () => {
		const { result, waitFor } = renderHook(() => {
			return useCalculate(stocks);
		});

		await waitFor(async () => {
			return expect(result.current).toBeDefined();
		});

		expect(result.current[0].length).toBe(5);
	});
});
