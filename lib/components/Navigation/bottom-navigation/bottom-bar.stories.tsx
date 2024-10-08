import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
    StandaloneGearFillIcon,
    StandaloneGearRegularIcon,
    StandaloneHouseBlankFillIcon,
    StandaloneHouseBlankRegularIcon,
    StandalonePlaceholderFillIcon,
    StandalonePlaceholderRegularIcon,
    StandaloneUserFillIcon,
    StandaloneUserRegularIcon,
} from "@deriv/quill-icons";
import Navigation from "..";
import { BottomBar, BottomAction } from ".";
import { Text } from "@components/Typography";
import "@deriv-com/quill-tokens/dist/quill.css";
import { Button } from "@components/Button";

type Template = React.ComponentProps<typeof BottomBar & typeof BottomAction>;

const icons: Record<string, object> = {
    placeholder: {
        active: <StandalonePlaceholderFillIcon iconSize="sm" />,
        default: <StandalonePlaceholderRegularIcon iconSize="sm" />,
    },
    home: {
        active: <StandaloneHouseBlankFillIcon iconSize="sm" />,
        default: <StandaloneHouseBlankRegularIcon iconSize="sm" />,
    },
    profile: {
        active: <StandaloneUserFillIcon iconSize="sm" />,
        default: <StandaloneUserRegularIcon iconSize="sm" />,
    },
    settings: {
        active: <StandaloneGearFillIcon iconSize="sm" />,
        default: <StandaloneGearRegularIcon iconSize="sm" />,
    },
};

const meta = {
    title: "Components/Navigation/BottomBar",
    args: {
        label: "Label",
        icon: <StandalonePlaceholderRegularIcon iconSize="sm" />,
        activeIcon: <StandalonePlaceholderFillIcon iconSize="sm" />,
        showLabels: false,
        value: 0,
        customIcon: "home",
    },
    argTypes: {
        customIcon: {
            description: "icon in each bottom bar action",
            options: Object.keys(icons),
            mapping: icons,
            control: {
                type: "radio",
            },
        },
        showLabels: {
            control: "boolean",
        },
        badge: { table: { disable: true } },
    },
} satisfies Meta<typeof BottomBar & typeof BottomAction>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: React.FC<Template> = ({ length = 4, ...args }: Template) => {
    const { value, showLabels, customIcon, ...rest } = args;
    const [index, setIndex] = React.useState(value);
    const [notificationCount, setNotificationCount] = React.useState<number[]>([
        100, 2, 1, 4,
    ]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setNotificationCount((prevCounts) =>
                prevCounts.map((prev) => Math.floor(Math.random() * 5) + prev),
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleClickButton = (value: number) => {
        setNotificationCount([value, value, value, value]);
    };

    const Content = () => (
        <div
            style={{
                backgroundColor:
                    "var(--semantic-color-slate-solid-surface-frame-low)",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>This is content in Menu {index + 1}</Text>
            <div>
                <Button
                    onClick={() => handleClickButton(100)}
                    label="Click Here set notification to 99+"
                />
                <Button
                    onClick={() => handleClickButton(1)}
                    label="Click Here set notification to 1"
                />
            </div>
        </div>
    );

    const handleClick = (indexToReset: number) => {
        setNotificationCount((prevCounts) =>
            prevCounts.map((count, i) => (i === indexToReset ? 0 : count)),
        );
    };

    React.useEffect(() => {
        setIndex(value);
    }, [value]);

    return (
        <>
            <Content />
            <Navigation.Bottom
                value={index}
                showLabels={showLabels}
                onChange={(_, newValue) => {
                    setIndex(newValue);
                }}
            >
                {Array.from({ length }, (_, index) => {
                    return (
                        <Navigation.BottomAction
                            {...rest}
                            activeIcon={customIcon.active}
                            icon={customIcon.default}
                            badge={
                                notificationCount[index] > 0
                                    ? notificationCount[index].toString()
                                    : undefined
                            }
                            onClick={() => handleClick(index)}
                        />
                    );
                })}
            </Navigation.Bottom>
        </>
    );
};

const BottomNavigationBarDefault = Template.bind(this) as Story;
BottomNavigationBarDefault.args = { ...meta.args, badge: "1" };

const BottomNavigationBarWithLabels = Template.bind(this) as Story;
BottomNavigationBarWithLabels.args = { ...meta.args, showLabels: true };

export { BottomNavigationBarDefault, BottomNavigationBarWithLabels };
