import { QuillIconComponent, StandardSizes } from "../../types";

export interface BaseChipProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    dismissible?: boolean;
    icon?: QuillIconComponent;
    labelTag?: string;
    disabled?: boolean;
}

export interface SelectableChipProps extends BaseChipProps {
    isDropdownOpen?: boolean;
    dropdown?: boolean;
    selected?: boolean;
    size?: StandardSizes;
    onChipSelect?: (
        event: React.MouseEvent<HTMLButtonElement>,
        value: boolean,
    ) => void;
    onDismiss?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}
