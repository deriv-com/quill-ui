import clsx from "clsx";
import "./list.scss";
import { TabProps } from "../types";
import { useContext, useEffect, useRef } from "react";
import { TabContext } from "../container";

export const TabList = ({ children, className }: TabProps) => {
    const { activeTab, contentStyle } = useContext(TabContext);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            const items = container.querySelectorAll<HTMLDivElement>("button");
            const item = items[activeTab as number];

            if (item) {
                const containerWidth = container.clientWidth;
                const itemWidth = item.clientWidth;
                const itemLeft = item.offsetLeft;
                const scrollPosition =
                    itemLeft - containerWidth / 2 + itemWidth / 2;

                container.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth",
                });
            }
        }
    }, [activeTab]);

    return (
        <div className={clsx("tab-list--container", className)}>
            {activeTab}
            <div
                ref={containerRef}
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
