import React from 'react';
import CustomSelectOptions from './CustomSelectOptions';

import './index.css';

const CustomSelect = ({ children, onChange, ...props }) => {
	const onChangeHandler = e => {
		onChange && onChange(e);
	};

	return (
		<select className='custom-select' onChange={onChangeHandler} {...props}>
			{children}
		</select>
	);
};

CustomSelect.Options = CustomSelectOptions;

export default CustomSelect;
