import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "@components/Pagination";
import { MOCK_DATA } from "@components/Pagination/mocks/mock-data";
import Mocks from "@components/Pagination/mocks";

const meta = {
    title: "Components/Pagination/Number",
    component: Pagination,
    parameters: {
        layout: "centered",
        exclude: ["contentLength"],
    },
    tags: ["autodocs"],
    argTypes: {
        variant: {
            options: ["number", "bullet"],
            control: { type: "select" },
            description: "Type of pagination",
            table: {
                defaultValue: { summary: "number" },
            },
        },
        contentPerPage: {
            control: { type: "number", min: 1 },
            description: "List of data to be rendered per page",
            table: {
                defaultValue: { summary: "1" },
            },
        },
        contentLength: {
            control: { type: "number", min: 1 },
            description: "Total length of data to be paginated",
            table: {
                defaultValue: { summary: "1" },
            },
        },
        className: {
            control: { type: "text" },
            description: "Styles to be applied to Pagination body",
        },
        onClickPagination: {
            description: "Callback function when pagination is triggered",
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NumberPagination: Story = {
    args: {
        contentPerPage: 5,
        variant: "number",
        contentLength: MOCK_DATA.length,
        onClickPagination: () => {},
    },
};

export const PaginationImplementation: Story = {
    render: () => <Mocks posts={MOCK_DATA} />,
    args: {
        contentPerPage: 5,
        variant: "number",
        contentLength: MOCK_DATA.length,
        onClickPagination: () => {},
    },
};
