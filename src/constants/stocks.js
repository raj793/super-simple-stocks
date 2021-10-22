export const types = {
	common: 'COMMON',
	preferred: 'PREFERRED',
};

export const stocks = [
	{
		symbol: 'TEA',
		type: types.common,
		lastDividend: 0,
		parValue: 100,
	},
	{
		symbol: 'POP',
		type: types.common,
		lastDividend: 8,
		parValue: 100,
	},
	{
		symbol: 'ALE',
		type: types.common,
		lastDividend: 23,
		parValue: 60,
	},
	{
		symbol: 'GIN',
		type: types.preferred,
		lastDividend: 8,
		fixedDividend: 2,
		parValue: 100,
	},
	{
		symbol: 'JOE',
		type: types.common,
		lastDividend: 13,
		parValue: 250,
	},
];
