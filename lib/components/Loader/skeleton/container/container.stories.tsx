import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "..";
import "@deriv-com/quill-tokens/dist/quill.css";

const meta = {
    title: "Components/Loader/Skeleton/Container",
    component: Skeleton.Container,
    args: {
        direction: "row",
        fullWidth: true,
    },
    argTypes: {
        direction: {
            description:
                "Control the direction of the container either row or column",
            table: { type: { summary: "column | row" } },
        },
        children: { control: false },
        className: { control: false },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Skeleton.Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: React.FC<React.ComponentProps<typeof Skeleton.Container>> = (
    args,
) => (
    <Skeleton.Container {...args}>
        <div>Hello</div>
        <Skeleton.Container fullWidth>
            <Skeleton.Circle />
            <Skeleton.Container
                skeletonHeight={50}
                // skeletonWidth={200}
                fullWidth
                direction="row"
            >
                <Skeleton.Square height={20} />
                <Skeleton.Square />
            </Skeleton.Container>
        </Skeleton.Container>

        <Skeleton.Square />
        <Skeleton.Square />
    </Skeleton.Container>
);

export const Example1 = Template.bind(this) as Story;
Example1.args = { ...meta.args };

export const Example2: Story = {
    args: {
        children: (
            <>
                <Skeleton.Container direction="column">
                    <Skeleton.Square height={20} />
                    <Skeleton.Square height={20} />
                </Skeleton.Container>
                <Skeleton.Container skeletonHeight={100} direction="row">
                    <Skeleton.Square height={50} />
                    <Skeleton.Square />
                    <Skeleton.Square />
                </Skeleton.Container>
            </>
        ),
    },
};

export const Example3: Story = {
    args: {
        children: (
            <>
                <Skeleton.Container direction="column">
                    <Skeleton.Circle />
                    <Skeleton.Square />
                    <Skeleton.Square />
                </Skeleton.Container>
                <Skeleton.Container skeletonHeight={100} direction="row">
                    <Skeleton.Square height={50} />
                    <Skeleton.Square />
                </Skeleton.Container>
            </>
        ),
    },
};
