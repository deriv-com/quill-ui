import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "..";
import "@deriv-com/quill-tokens/dist/quill.css";

const meta = {
    title: "Components/Loader/Skeleton/Container",
    component: Skeleton.Container,
    args: {
        direction: "column",
    },
    argTypes: {
        direction: {
            description:
                "Control the direction of the container either row or column",
            table: { type: { summary: "column | row" } },
        },
        children: { control: false },
        className: { control: false },
        rounded: { control: "boolean" },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Skeleton.Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: React.FC<React.ComponentProps<typeof Skeleton.Container>> = (
    args,
) => (
    <Skeleton.Container {...args}>
        <Skeleton.Circle />
        <Skeleton.Square height={20} width="50%" />
        <Skeleton.Square height={50} />
    </Skeleton.Container>
);

export const Example1 = Template.bind(this) as Story;
Example1.args = { ...meta.args };

const Template2: React.FC<React.ComponentProps<typeof Skeleton.Container>> = (
    args,
) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Skeleton.Container {...args} direction="column">
            <Skeleton.Square height={20} />
            <Skeleton.Square height={20} />
        </Skeleton.Container>
        <Skeleton.Container {...args}>
            <Skeleton.Square height={50} />
            <Skeleton.Square />
            <Skeleton.Square />
        </Skeleton.Container>
    </div>
);

export const Example2 = Template2.bind(this) as Story;
Example2.args = { ...meta.args };

const Template3: React.FC<React.ComponentProps<typeof Skeleton.Container>> = (
    args,
) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Skeleton.Container {...args} direction="column">
            <Skeleton.Circle />
            <Skeleton.Square />
            <Skeleton.Square />
        </Skeleton.Container>
        <Skeleton.Container skeletonHeight={100} direction="row" {...args}>
            <Skeleton.Square height={50} />
            <Skeleton.Square />
        </Skeleton.Container>
    </div>
);

export const Example3 = Template3.bind(this) as Story;
Example3.args = { ...meta.args };
