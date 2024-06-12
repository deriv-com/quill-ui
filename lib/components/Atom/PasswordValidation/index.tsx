import { Status } from "@components/Input/base";
import {
    LabelPairedCircleCaptionRegularIcon,
    LabelPairedCircleCheckCaptionFillIcon,
    LabelPairedCircleXmarkCaptionFillIcon,
} from "@deriv/quill-icons/LabelPaired";
import React, { ReactNode } from "react";
import "./password-validation.scss";
import { CaptionText } from "@components/Typography";

export type PasswordStrengthValidationProps = {
    status: Status;
    validationMessage: ReactNode;
};
export const PasswordStrengthValidation = ({
    status,
    validationMessage,
}: PasswordStrengthValidationProps) => {
    return (
        <div className="validation_message">
            {status === "success" ? (
                <LabelPairedCircleCheckCaptionFillIcon fill="var(--component-textIcon-statusNormal-success)" />
            ) : status === "error" ? (
                <LabelPairedCircleXmarkCaptionFillIcon fill="var(--component-textIcon-statusNormal-danger)" />
            ) : (
                <LabelPairedCircleCaptionRegularIcon fill="var(--component-textIcon-normal-default)" />
            )}
            <CaptionText color={status}>{validationMessage}</CaptionText>
        </div>
    );
};

export default PasswordStrengthValidation;
