import { QuillIconComponent, TRegularSizes } from "@types";
import { ReactNode } from "react";

export interface BaseChipProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    dismissible?: boolean;
    icon?: QuillIconComponent & ReactNode;
    label?: string;
    labelTag?: string;
    disabled?: boolean;
    isDropdownOpen?: boolean;
    dropdown?: boolean;
    selected?: boolean;
    size?: TRegularSizes;
    onChipSelect?: (
        event: React.MouseEvent<HTMLButtonElement>,
        value: boolean,
    ) => void;
    onDismiss?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

export interface SelectableChipProps
    extends Omit<BaseChipProps, "isDropdownOpen" | "dropdown"> {
    className?: string;
}

export type TSingleSelectItem = {
    value: number | string;
    label: string;
    disabled?: boolean;
};

export interface SingleSelectChipProps extends BaseChipProps {
    options: TSingleSelectItem[];
    defaultOption: TSingleSelectItem;
    onSelectionChange: (item: TSingleSelectItem) => void;
}
