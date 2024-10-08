import React from "react";
import clsx from "clsx";
import "./stepper.scss";
import { LabelPairedCheckLgFillIcon, LabelPairedCheckMdFillIcon, LabelPairedCheckSmFillIcon } from "@deriv/quill-icons";
import { Text } from "@components/Typography";
import { TBasicStepperProps, TTypographySizes } from "./types";
import { VerticalStepper } from './vertical-stepper';
import { HorizontalStepper } from './horizontal-stepper';

const fillColor = "var(--semantic-color-slate-solid-surface-frame-low)";

const icon = {
    sm: <LabelPairedCheckSmFillIcon fill={fillColor} />,
    md: <LabelPairedCheckMdFillIcon fill={fillColor} />,
    lg: <LabelPairedCheckLgFillIcon fill={fillColor} />,
};

const IconOk = ({ size }: { size: TTypographySizes }) => (<>{icon[size]}</>);

export const BasicStepper = ({
    currentStep,
    Icon = IconOk,
    size = "md",
    labels = [],
    lineSize = "md",
}: TBasicStepperProps) => (
    <div className="quill-steps-container">
        {typeof currentStep === 'number' && labels.map((step, index) => {
            const isActive = index <= currentStep;
            const isPreviousInactive = index > currentStep + 1;

            return (
                index !== 0 && (
                    <React.Fragment key={step}>
                        <div className="step">
                            <div className="step-circle__pointer">
                                <div
                                    className={clsx("step-circle", `step-circle__size-${size}`, {
                                        "step-circle--active": isActive,
                                        "step-circle--inactive": !isActive,
                                        "step-circle--disabled": isPreviousInactive,
                                    })}
                                    data-testid="dt-step-circle"
                                >
                                    {isActive && <Icon size={size} />}
                                </div>
                                {index !== labels.length - 1 && (
                                    <div
                                        className={clsx("step-line", `step-line--size-${lineSize}`, {
                                            "step-line--disabled": index > currentStep,
                                        })}
                                        data-testid="dt-step-line" />
                                )}
                            </div>
                            <Text
                                as="span"
                                bold
                                size={size}
                                className={clsx(`step-circle__label-${size}`, {
                                    "step-circle__label--disabled": isPreviousInactive
                                })}>
                                {labels[index - 1]}
                            </Text>
                        </div>
                    </React.Fragment>
                )
            );
        })}
    </div>
);

export const Stepper = {
    Vertical: VerticalStepper,
    Horizontal: HorizontalStepper,
};

export default Stepper;
