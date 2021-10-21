import React from 'react';

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
		/>
	);
};

export default CustomInput;
