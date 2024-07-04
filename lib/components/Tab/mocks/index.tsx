import Tab from "@components/Tab";
import { Text } from "@components/Typography";
import { TabProps } from "../types";

const MockTab = ({
    size,
    iconPosition,
    contentStyle,
    selectedTabIndex,
    onTabClick,
    ...props
}: TabProps) => {
    const length = 5;
    return (
        <Tab.Container
            id="test"
            size={size}
            iconPosition={iconPosition}
            contentStyle={contentStyle}
            selectedTabIndex={selectedTabIndex}
            onTabClick={onTabClick}
        >
            <Tab.List>
                {Array.from({ length }).map((_, index) => (
                    <Tab.Trigger {...props} key={index}>
                        Tab {index + 1}
                    </Tab.Trigger>
                ))}
                <Tab.Trigger disabled {...props}>
                    Disabled Tab
                </Tab.Trigger>
            </Tab.List>
            <Tab.Content>
                {Array.from({ length }).map((_, index) => (
                    <Tab.Panel key={index}>
                        <Text>Content in tab {index + 1}</Text>
                    </Tab.Panel>
                ))}
            </Tab.Content>
        </Tab.Container>
    );
};
export default MockTab;
