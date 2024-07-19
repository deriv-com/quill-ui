import React from "react";
import "./reset.scss";

export interface QuillResetCssWrapperProps {
    children: React.ReactNode;
}

export const QuillResetCssWrapper = ({
    children,
}: QuillResetCssWrapperProps) => {
    return <div className="quill-reset">{children}</div>;
};
