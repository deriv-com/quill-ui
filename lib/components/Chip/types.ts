import { DropdownItemProps } from "@components/Atom";
import { QuillIconComponent, TRegularSizes } from "@types";
import { ReactNode } from "react";

export interface BaseChipProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    dismissible?: boolean;
    icon?: QuillIconComponent;
    label?: ReactNode;
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

export interface TSingleSelectItem extends DropdownItemProps {
    value: number | string;
}

export interface SingleSelectChipProps extends BaseChipProps {
    options: TSingleSelectItem[];
    defaultOption: TSingleSelectItem;
    onSelectionChange: (item: TSingleSelectItem) => void;
}

export interface MultiSelectChipProps extends BaseChipProps {
    options: TSingleSelectItem[];
    label: string;
    onSelectionChange: (item: TSingleSelectItem[]) => void;
}

export interface DismissibleChipProps extends BaseChipProps {
    onDismiss?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}
