import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "..";
import "@deriv-com/quill-tokens/dist/quill.css";

const meta = {
    title: "Components/Loader/Skeleton/Container",
    component: Skeleton.Container,
    args: {
        direction: "row",
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

export const Example1: Story = {
    args: {
        children: (
            <>
                <Skeleton.Container skeletonWidth={100} direction="column">
                    <Skeleton.Circle />
                    <Skeleton.Container skeletonWidth={200} direction="row">
                        <Skeleton.Square height={20} />
                        <Skeleton.Square height={20} />
                    </Skeleton.Container>
                </Skeleton.Container>
                <Skeleton.Container
                    skeletonWidth={520}
                    skeletonHeight={100}
                    direction="row"
                >
                    <Skeleton.Square height={50} />
                    <Skeleton.Square />
                    <Skeleton.Square />
                </Skeleton.Container>
            </>
        ),
    },
};

export const Example2: Story = {
    args: {
        children: (
            <>
                <Skeleton.Container skeletonWidth={200} direction="column">
                    <Skeleton.Square height={20} />
                    <Skeleton.Square height={20} />
                </Skeleton.Container>
                <Skeleton.Container
                    skeletonWidth={520}
                    skeletonHeight={100}
                    direction="row"
                >
                    <Skeleton.Square height={50} />
                    <Skeleton.Square />
                    <Skeleton.Square />
                </Skeleton.Container>
            </>
        ),
    },
};
