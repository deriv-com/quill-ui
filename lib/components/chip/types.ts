import { QuillIconComponent, TRegularSizes } from "../../types";

export interface BaseChipProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    dismissible?: boolean;
    icon?: QuillIconComponent;
    label?: string;
    labelTag?: string;
    disabled?: boolean;
}

export interface SelectableChipProps extends BaseChipProps {
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
