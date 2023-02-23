/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import clsx from 'clsx';

import { TypographyProps } from './Typography.types';

const Typography: React.FC<TypographyProps> = ({ variant, component, children, className, onClick }) => {
	const Component = component ?? 'div';

	return (
		<Component className={clsx(variant, className)} onClick={onClick}>
			{children}
		</Component>
	);
};

Typography.defaultProps = {
	variant: 'Regular200',
	onClick: () => {},
};

export default Typography;
export type { TypographyProps };
