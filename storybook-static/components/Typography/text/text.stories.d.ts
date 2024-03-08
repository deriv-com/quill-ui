import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: ({ children, className, as, size, italic, underlined, bold, ...rest }: import("../base").TypographyProps) => import("react").JSX.Element;
    tags: string[];
    args: {
        italic: false;
        bold: false;
        underlined: false;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const SizeXL: Story;
export declare const SizeLG: Story;
export declare const SizeMD: Story;
export declare const SizeSM: Story;
