import { ReactElement, SyntheticEvent } from 'react';

export type Typography =
	| 'Light100'
	| 'Light200'
	| 'Light300'
	| 'Light400'
	| 'Light500'
	| 'Light600'
	| 'Light700'
	| 'Regular100'
	| 'Regular200'
	| 'Regular300'
	| 'Regular400'
	| 'Regular500'
	| 'Regular600'
	| 'Regular700'
	| 'SemiBold100'
	| 'SemiBold200'
	| 'SemiBold300'
	| 'SemiBold400'
	| 'SemiBold500'
	| 'SemiBold600'
	| 'SemiBold700'
	| 'Bold100'
	| 'Bold200'
	| 'Bold300'
	| 'Bold400'
	| 'Bold500'
	| 'Bold600'
	| 'Bold700';

export interface TypographyProps {
	variant?: Typography;
	component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div';
	children: number | string | ReactElement;
	className?: string;
	onClick?: (event: SyntheticEvent) => void;
}
