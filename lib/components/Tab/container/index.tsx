import { createContext, useEffect, useState } from "react";
import { TabProps } from "@components/Tab/types";

export type TabContextType = TabProps & {
    handleToggle?: (idx: number) => void;
    activeTab?: number;
};

export const TabContext = createContext<TabContextType>({
    activeTab: 0,
});

export const TabContainer = ({
    children,
    id = "tab-default-id",
    size = "md",
    iconPosition = "left",
    contentStyle = "fill",
    className,
    selectedTabIndex,
    onChangeTab,
}: TabProps) => {
    const [activeTab, setActiveTab] = useState(selectedTabIndex ?? 0);

    const handleToggle = (index: number) => {
        setActiveTab(index);
        onChangeTab?.(index);
    };

    useEffect(() => {
        if (selectedTabIndex !== undefined) {
            setActiveTab(selectedTabIndex);
        }
    }, [selectedTabIndex]);

    return (
        <TabContext.Provider
            value={{
                activeTab,
                handleToggle,
                id,
                size,
                iconPosition,
                contentStyle,
            }}
        >
            <div id={id} className={className}>
                {children}
            </div>
        </TabContext.Provider>
    );
};
