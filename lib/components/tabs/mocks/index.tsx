import { ComponentProps } from "react";
import Tab from "../index";
import { Text } from "../../Typography";

const MockTab = ({
    size,
    iconPosition,
    ...props
}: ComponentProps<typeof Tab.Container> &
    ComponentProps<typeof Tab.Trigger>) => {
    return (
        <Tab.Container id="test" size={size} iconPosition={iconPosition}>
            <Tab.List>
                <Tab.Trigger {...props}>Forex</Tab.Trigger>
                <Tab.Trigger {...props}>Derived Indices</Tab.Trigger>
                <Tab.Trigger disabled={true} {...props}>
                    Stocks
                </Tab.Trigger>
            </Tab.List>
            <Tab.Content>
                <Tab.Panel>
                    <Text size={size}>Forex Tab</Text>
                </Tab.Panel>
                <Tab.Panel>
                    <Text size={size}>Derived indices Tab</Text>
                </Tab.Panel>
                <Tab.Panel>
                    <Text size={size}>Stocks Tab</Text>
                </Tab.Panel>
            </Tab.Content>
        </Tab.Container>
    );
};
export default MockTab;
