import { useContext, useEffect, MouseEvent, useRef, useState } from "react";
import { TabContext } from "../container";
import { TabProps } from "../types";
import { Text } from "@components/Typography";
import clsx from "clsx";
import "./trigger.scss";
import "../tab.scss";

export const TabTrigger = ({
    children,
    icon,
    className,
    ...rest
}: TabProps) => {
    const [selectedTab, setSelectedTab] = useState(false);
    const { activeTab, handleToggle, id, size, iconPosition } =
        useContext(TabContext);

    const onClickTab = (e: MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.parentElement) {
            const idx = Array.from(
                e.currentTarget.parentElement.children,
            ).indexOf(e.currentTarget);
            handleToggle?.(idx);
        }
    };
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (ref.current && ref.current?.parentElement) {
            const items = Array.from(ref.current.parentElement?.children);
            const idx = items.indexOf(ref.current);

            if (activeTab === idx) {
                ref.current.setAttribute("aria-selected", "true");
                setSelectedTab(true);
            } else {
                ref.current.setAttribute("aria-selected", "false");
                setSelectedTab(false);
            }

            items.forEach((item, i) => {
                item.id = `${id}-trigger-${i}`;
            });
        }
    }, [activeTab, id, selectedTab]);

    const labelColor = selectedTab
        ? "quill-typography__color--prominent"
        : "quill-typography__color--default";

    return (
        <button
            onClick={onClickTab}
            role="tab"
            ref={ref}
            {...rest}
            className={clsx(
                "tab-menu",
                `tab-menu__variants--size-${size}`,
                `tab-trigger__icon-position--${iconPosition}`,
                selectedTab && "tab-menu__selected-tab",
                className,
            )}
        >
            {icon && size && iconPosition && (
                <div data-testid="dt-tab-trigger-icon" className="tab__icon">
                    {icon}
                </div>
            )}
            <Text size={size} color={labelColor}>
                {children}
            </Text>
        </button>
    );
};

TabTrigger.displayName = "TabTrigger";
