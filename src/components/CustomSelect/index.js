import React from 'react';
import CustomSelectOptions from './CustomSelectOptions';

import './index.css';

const CustomSelect = ({ children, onChange }) => {
	const onChangeHandler = e => {
		onChange && onChange(e);
	};

	return (
		<select className='custom-select' onChange={onChangeHandler}>
			{children}
		</select>
	);
};

CustomSelect.Options = CustomSelectOptions;

export default CustomSelect;
