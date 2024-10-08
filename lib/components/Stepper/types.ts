import { TypographyProps } from "@components/Typography/base";

type TEnum = { [key: string]: number };
export type TTypographySizes = Extract<TypographyProps['size'], 'sm' | 'md' | 'lg'>;

export type TBasicStepperProps = {
    currentStep: number | TEnum;
    Icon?: ({ size }: { size: TTypographySizes }) => React.ReactNode;
    size?: TTypographySizes;
    labels: string[];
    lineSize?: string;
    orientation?: string;
};
