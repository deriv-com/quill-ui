import clsx from "clsx";
import "./list.scss";
import { TabProps } from "../types";
import { useContext, useEffect } from "react";
import { TabContext } from "../container";

export const TabList = ({ children, className }: TabProps) => {
    const { contentStyle, clickedTabRef } = useContext(TabContext);

    useEffect(() => {
        if (clickedTabRef) {
            const ref = clickedTabRef.current;

            ref?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [clickedTabRef?.current]);

    return (
        <div className={clsx("tab-list--container", className)}>
            <div
                className={clsx(
                    "tab-list--item",
                    contentStyle === "hug" && "tab-list--item-hug-content",
                )}
                role="tablist"
                aria-orientation="horizontal"
            >
                {children}
            </div>
        </div>
    );
};
