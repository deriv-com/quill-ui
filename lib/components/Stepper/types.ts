import { TypographyProps } from "@components/Typography/base";

type TEnum = { [key: string]: number };

export type TBasicStepperProps = {
    currentStep: number | TEnum;
    Icon?: ({ size }: { size: TypographyProps['size']; }) => React.ReactNode;
    size?: TypographyProps['size'];
    labels: string[];
    lineSize?: string;
    orientation?: string;
};
