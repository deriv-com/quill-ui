import {
    MutableRefObject,
    createContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { TabProps } from "@components/Tab/types";

export type TabContextType = TabProps & {
    handleToggle?: (idx: number) => void;
    activeTab?: number;
    clickedTabRef?: MutableRefObject<HTMLButtonElement | null> | null;
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
    selectedTabIndex = 0,
    onChangeTab,
    onTabClick,
}: TabProps) => {
    const [activeTab, setActiveTab] = useState(selectedTabIndex);
    const clickedTabRef = useRef<HTMLButtonElement>(null);

    const handleToggle = (index: number) => {
        setActiveTab(index);
        onChangeTab?.(index);
    };

    useEffect(() => {
        handleToggle(selectedTabIndex);
    }, [selectedTabIndex]);

    return (
        <TabContext.Provider
            value={{
                activeTab,
                clickedTabRef,
                handleToggle,
                onTabClick,
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
