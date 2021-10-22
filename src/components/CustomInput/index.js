import React from 'react';
import './index.css';

const CustomInput = ({ value, defaultValue, onChange, ...props }) => {
	const onChangeHandler = e => {
		onChange && onChange(e);
	};

	return (
		<input
			{...props}
			value={value}
			defaultValue={defaultValue}
			onChange={onChangeHandler}
			className='custom-input'
		/>
	);
};

export default CustomInput;
