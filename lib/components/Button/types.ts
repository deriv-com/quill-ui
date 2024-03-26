import { QuillSvgProps } from "@deriv/quill-icons";
import { ComponentProps, ReactElement, ReactNode } from "react";
import { TDefaultColor, TGenericSizes } from "../../types";

export type TVariant = "primary" | "secondary" | "tertiary";

export type TColor = TDefaultColor | "purchase" | "sell";

export type TSocial = "google" | "facebook" | "apple";

export type QuillIconComponent = React.ForwardRefExoticComponent<
    Omit<QuillSvgProps, "ref">
>;
export interface ButtonProps extends ComponentProps<"button"> {
    variant?: TVariant;
    colorStyle?: TColor;
    icon?: QuillIconComponent;
    isDropdownOpen?: boolean;
    selected?: boolean;
    size?: Extract<TGenericSizes, "xl" | "lg" | "md" | "sm">;
    dropdown?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    iconPosition?: "start" | "end";
    className?: string;
    label?: string | ReactElement;
    children?: ReactNode | string;
}

export interface SocialButtonProps extends ComponentProps<"button"> {
    variant?: "primary" | "secondary"
    social ? : TSocial
    size: Extract<TGenericSizes, "xl" | "lg" | "md">;
    colorStyle?: TDefaultColor;
    hideLabel?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
}