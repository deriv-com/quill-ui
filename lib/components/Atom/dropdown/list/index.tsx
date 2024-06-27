import React from "react";
import "./dropdown-list.scss";
import { DropdownItemProps } from "../item";
import clsx from "clsx";

export interface DropdownListData {
    section: string;
    items: string[];
}

export interface DropdownListProps extends DropdownItemProps {
    data: DropdownListData[];
}

const DropdownList = ({ size = "md", ...rest }: DropdownListProps) => {
    return (
        <div
            className={clsx(
                "quill-dropdown-list__container",
                `quill-dropdown-list__size--${size}`,
            )}
        >
            DropdownList
        </div>
    );
};

export default DropdownList;
