import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: ({ children, className, as, ...rest }: import("./h1").Heading) => import("react").JSX.Element;
    tags: string[];
    argTypes: {
        as: {
            table: {
                disable: boolean;
            };
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const H1: Story;
export declare const H2: (args: Story) => import("react").JSX.Element;
export declare const H3: (args: Story) => import("react").JSX.Element;
export declare const H4: (args: Story) => import("react").JSX.Element;
export declare const H5: (args: Story) => import("react").JSX.Element;
export declare const H6: (args: Story) => import("react").JSX.Element;
