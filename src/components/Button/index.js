import React from 'react';

const Button = ({ children, ...props }) => {
	return (
		<button type='button' {...props}>
			{children}
		</button>
	);
};

export default Button;
