import React from 'react';

const CustomInput = ({ value, defaultValue, onChange, ...props }) => {
	const onChangeHandler = e => {
		//TODO: onChange handler implementation
	};

	return (
		<input
			{...props}
			value={value}
			defaultValue={defaultValue}
			onChange={onChangeHandler}
		/>
	);
};

export default CustomInput;
