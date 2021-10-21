import React from 'react';

const CustomSelectOptions = ({ value, children }) => {
	return <option value={value}>{children}</option>;
};

export default CustomSelectOptions;
