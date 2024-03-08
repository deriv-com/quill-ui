import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: ({ children, className, as, italic, underlined, bold, ...rest }: import("../base").TypographyProps) => import("react").JSX.Element;
    tags: string[];
    args: {
        italic: false;
        bold: false;
        underlined: false;
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const RegularDefault: Story;
export declare const RegularItalic: Story;
export declare const RegularUnderlined: Story;
export declare const RegularItalicUnderlined: Story;
export declare const BoldDefault: Story;
export declare const BoldItalic: Story;
export declare const BoldUnderlined: Story;
export declare const BoldItalicUnderlined: Story;
