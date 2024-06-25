import Tab from "@components/Tab";
import { Text } from "@components/Typography";
import { TabProps } from "../types";

const MockTab = ({
    size,
    iconPosition,
    contentStyle,
    initialActiveTab,
    ...props
}: TabProps) => {
    return (
        <Tab.Container
            id="test"
            size={size}
            iconPosition={iconPosition}
            contentStyle={contentStyle}
            initialActiveTab={initialActiveTab}
        >
            <Tab.List>
                <Tab.Trigger {...props}>Forex</Tab.Trigger>
                <Tab.Trigger {...props}>Derived Indices</Tab.Trigger>
                <Tab.Trigger {...props}>Stocks</Tab.Trigger>
                <Tab.Trigger disabled {...props}>
                    Crypto
                </Tab.Trigger>
            </Tab.List>
            <Tab.Content>
                <Tab.Panel>
                    <Text>Forex Tab</Text>
                </Tab.Panel>
                <Tab.Panel>
                    <Text>Derived indices Tab</Text>
                </Tab.Panel>
                <Tab.Panel>
                    <Text>Stocks Tab</Text>
                </Tab.Panel>
            </Tab.Content>
        </Tab.Container>
    );
};
export default MockTab;
