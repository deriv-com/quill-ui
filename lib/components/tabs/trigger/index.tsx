import { useContext, useEffect, MouseEvent, useRef, useState } from "react";
import { TabContext } from "../container";
import { TabProps, TTabSize } from "../types";
import { Text } from "../../Typography";
import clsx from "clsx";
import "./trigger.scss";
import "../tabs.scss";

export const TabTrigger = ({
    children,
    icon: Icon,
    className,
    ...rest
}: TabProps) => {
    const IconSize: Record<TTabSize, { width: number; height: number }> = {
        sm: {
            width: 24,
            height: 24,
        },
        md: {
            width: 32,
            height: 32,
        },
    };
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
                "tabs",
                `tabs__variants--size-${size}`,
                `tab-trigger__icon-position--${iconPosition}`,
                selectedTab && "tabs__selected-tab",
                className,
            )}
        >
            {Icon && size && iconPosition && (
                <Icon
                    data-testid="dt-tab-trigger-icon"
                    {...IconSize[size as TTabSize]}
                    className={clsx("tab-trigger")}
                    fill="var(--semantic-color-typography-prominent)"
                />
            )}
            <Text size={size} color={labelColor}>
                {children}
            </Text>
        </button>
    );
};

TabTrigger.displayName = "TabTrigger";
