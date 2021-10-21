import React from 'react';
import CustomSelectOptions from './CustomSelectOptions';

const CustomSelect = ({ children, onChange }) => {
	const onChangeHandler = e => {
		//TODO: Perform onChange operations
	};

	return <select onChange={onChangeHandler}>{children}</select>;
};

CustomSelect.Options = CustomSelectOptions;

export default CustomSelect;
