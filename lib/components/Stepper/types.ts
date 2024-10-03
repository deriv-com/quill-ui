import { TypographyProps } from "@components/Typography/base";

export type TBasicStepperProps = {
    currentStep: Steps.StepOne | Steps.StepTwo | Steps.StepThree;
    Icon?: ({ size }: { size: TypographyProps['size']; }) => React.ReactNode;
    size?: TypographyProps['size'];
    labels: string[];
    allSteps: Steps[];
    lineSize?: string;
    orientation?: string;
};

export enum Steps {
    StepOne,
    StepTwo,
    StepThree,
}
