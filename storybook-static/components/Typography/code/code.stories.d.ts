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
    argTypes: {
        size: {
            description: string;
            options: string[];
            control: {
                type: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
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
