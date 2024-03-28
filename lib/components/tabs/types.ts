import { ComponentProps } from 'react';
import { QuillSvgProps } from '@deriv/quill-icons';

export type QuillIconComponent = React.ForwardRefExoticComponent<
    Omit<QuillSvgProps, "ref">
>;
export type TTabSize = 'sm' | 'md'

export interface TabProps extends ComponentProps<"button">  {
    size?: TTabSize
    icon? : QuillIconComponent
    iconPosition?: 'left' | 'top'
    className?: string
    children?: React.ReactNode
}

