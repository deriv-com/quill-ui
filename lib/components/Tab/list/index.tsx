import clsx from "clsx";
import "./list.scss";
import { TabProps } from "../types";
import { useContext } from "react";
import { TabContext } from "../container";

export const TabList = ({ children, className }: TabProps) => {
    const { tabContent } = useContext(TabContext);
    return (
        <div className={clsx("tab-list--container", className)}>
            <div
                className={clsx(
                    "tab-list--item",
                    tabContent === "hug" && "tab-list--item-hug-content",
                )}
                role="tablist"
                aria-orientation="horizontal"
            >
                {children}
            </div>
        </div>
    );
};
