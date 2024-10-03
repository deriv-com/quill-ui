import React from "react";
import clsx from "clsx";
import "./stepper.scss";
import { LabelPairedCheckMdFillIcon } from "@deriv/quill-icons";
import { Text } from "@components/Typography";
import { TBasicStepperProps } from "./types";
import { VerticalStepper } from './vertical-stepper';
import { HorizontalStepper } from './horizontal-stepper';
import { TypographyProps } from "@components/Typography/base";

const IconOk = ({ size }: { size: TypographyProps['size'] }) => (
    <LabelPairedCheckMdFillIcon
        fill="var(--semantic-color-slate-solid-surface-frame-low)"
        width={size === "sm" ? 11 : size === "md" ? 13 : 14}
    />
);

export const BasicStepper = ({
    currentStep,
    Icon = IconOk,
    size = "md",
    labels = [],
    allSteps,
    lineSize = "md",
}: TBasicStepperProps) => {
    const steps = Object.values(allSteps).filter(
        (value) => typeof value === "number"
    );

    return (
        <div className="steps-container" >
            {
                steps.map((step, index) => {
                    const isActive = index <= currentStep;
                    const isPreviousInactive = index > currentStep + 1;

                    return (
                        index !== 0 && (
                            <React.Fragment key={step} >
                                <div className="step" >
                                    <div className="step-circle__pointer" >
                                        <div
                                            className={
                                                clsx("step-circle", `step-circle__size-${size}`, {
                                                    "step-circle--active": isActive,
                                                    "step-circle--inactive": !isActive,
                                                    "step-circle--disabled": isPreviousInactive,
                                                })
                                            }
                                            data-testid="dt-step-circle"
                                        >
                                            {isActive && <Icon size={size} />
                                            }
                                        </div>
                                        {index !== steps.length - 1 && (
                                            <div
                                                className={
                                                    clsx("step-line", `step-line--size-${lineSize}`, {
                                                        "step-line--disabled": index > currentStep,
                                                    })
                                                }
                                                data-testid="dt-step-line"
                                            />
                                        )}
                                    </div>
                                    <Text
                                        as="span"
                                        bold
                                        size={size}
                                        // color="var(--component-stepper-label-color-active)"
                                        // color="var(--semantic-color-slate-solid-surface-frame-low)"
                                        className={
                                            clsx(`step-circle__label-${size}`, {
                                                "step-circle__label--disabled": isPreviousInactive
                                            })
                                        }>
                                        {labels[index - 1]}
                                    </Text>
                                </div>
                            </React.Fragment>
                        )
                    );
                })}
        </div>
    );
};

export const Stepper = {
    Vertical: VerticalStepper,
    Horizontal: HorizontalStepper,
};

export default Stepper;
