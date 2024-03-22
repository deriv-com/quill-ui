import { QuillSvgProps } from "@deriv/quill-icons";
import { ComponentProps, ReactElement, ReactNode } from "react";
import { TGenericSizes } from "../../types";

export type TVariant = "primary" | "secondary" | "tertiary";

export type TColor = "coral" | "black" | "white" | "purchase" | "sell";

export type QuillIconComponent = React.ForwardRefExoticComponent<
    Omit<QuillSvgProps, "ref">
>;
export interface ButtonProps extends ComponentProps<"button"> {
    variant?: TVariant;
    color?: TColor;
    icon?: QuillIconComponent;
    chevronIcon?: QuillIconComponent;
    isDropdownOpen?: boolean;
    selected?: boolean;
    size?: Extract<TGenericSizes, "xl" | "lg" | "md" | "sm">;
    dropdown?: boolean;
    onItemSelect?: (
        event: React.MouseEvent<HTMLButtonElement>,
        value: boolean,
    ) => void;
    isFullWidth?: boolean;
    isLoading?: boolean;
    iconPosition?: "start" | "end";
    className?: string;
    label?: string | ReactElement;
    children?: ReactNode | string;
}