import { useContext, useEffect, MouseEvent, useRef, useState } from "react";
import { TabContext } from "@components/Tab/container";
import { TabProps } from "@components/Tab/types";
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
    const ref = useRef<HTMLButtonElement>(null);
    const [selectedTab, setSelectedTab] = useState(false);
    const {
        activeTab,
        handleToggle,
        clickedTabRef,
        onTabClick,
        id,
        size,
        iconPosition,
        contentStyle,
    } = useContext(TabContext);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (clickedTabRef) clickedTabRef.current = ref.current;
        if (e.currentTarget.parentElement) {
            const idx = Array.from(
                e.currentTarget.parentElement.children,
            ).indexOf(e.currentTarget);
            if (idx === activeTab) return;
            handleToggle?.(idx);
            onTabClick?.(idx);
        }
    };

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
            onClick={handleClick}
            role="tab"
            ref={ref}
            {...rest}
            className={clsx(
                "tab-menu",
                contentStyle === "fill"
                    ? `tab-menu__variants__fill-size-${size} `
                    : `tab-menu__variants__hug-size-${size}`,
                `tab-trigger__icon-position--${iconPosition}`,
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
