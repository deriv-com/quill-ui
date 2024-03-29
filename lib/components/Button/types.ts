import { QuillSvgProps } from "@deriv/quill-icons";
import { ComponentProps, ReactNode } from "react";
import { TDefaultColor, TGenericSizes } from "../../types";

export type TVariant = "primary" | "secondary" | "tertiary";

export type TColor = TDefaultColor | "purchase" | "sell";

export type TSocial = "google" | "facebook" | "apple";

export type QuillIconComponent = React.ForwardRefExoticComponent<
    Omit<QuillSvgProps, "ref">
>;
export interface ButtonProps extends ComponentProps<"button"> {
    variant?: TVariant;
    color?: TColor;
    icon?: ReactNode;
    isDropdownOpen?: boolean;
    selected?: boolean;
    size?: Extract<TGenericSizes, "xl" | "lg" | "md" | "sm">;
    dropdown?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    iconPosition?: "start" | "end";
    className?: string;
    label?: ReactNode;
    children?: ReactNode;
}

export interface SocialButtonProps extends ComponentProps<"button"> {
    variant?: "primary" | "secondary";
    social?: TSocial;
    size?: Extract<TGenericSizes, "xl" | "lg" | "md">;
    color?: TDefaultColor;
    hideLabel?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
}
