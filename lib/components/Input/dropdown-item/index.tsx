import React, { ReactNode } from "react";

export interface DropdownItemProps {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    as?: "div" | "li";
}

const DropdownItem = ({
    as: Component = "div",
    leftIcon,
    rightIcon,
}: DropdownItemProps) => {
    return <Component>DropdownItem</Component>;
};

export default DropdownItem;
