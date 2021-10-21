import React from 'react';
import CustomSelectOptions from './CustomSelectOptions';

const CustomSelect = ({ children, onChange }) => {
	const onChangeHandler = e => {
		onChange && onChange(e);
	};

	return <select onChange={onChangeHandler}>{children}</select>;
};

CustomSelect.Options = CustomSelectOptions;

export default CustomSelect;
