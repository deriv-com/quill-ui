import { QuillSvgProps } from "@deriv/quill-icons";
import { ComponentProps, ReactNode } from "react";
import {
    TDefaultColor,
    TRegularSizesWithExtraLarge,
    TSemiRegularSizes,
} from "@types";

export type TButtonVariant = "primary" | "secondary" | "tertiary";

export type TColor = TDefaultColor | "purchase" | "sell";

export type TSocial = "google" | "facebook" | "apple";

export type QuillIconComponent = React.ForwardRefExoticComponent<
    Omit<QuillSvgProps, "ref">
>;
export interface ButtonProps extends ComponentProps<"button"> {
    variant?: TButtonVariant;
    color?: TColor;
    icon?: ReactNode;
    isDropdownOpen?: boolean;
    selected?: boolean;
    size?: TRegularSizesWithExtraLarge;
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
    size?: TSemiRegularSizes;
    color?: TDefaultColor;
    hideLabel?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
}
