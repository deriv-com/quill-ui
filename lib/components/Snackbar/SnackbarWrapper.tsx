import { StandalonePlaceholderRegularIcon } from "@deriv/quill-icons/Standalone";
import { Snackbar } from ".";
import React, { useState } from "react";

export const SnackbarWrapper = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleActionClick = () => {
        handleClose();
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 1000);
    };

    return (
        <div>
            <button onClick={handleOpen} style={{ color: "white" }}>
                Click me
            </button>
            <Snackbar
                icon={
                    <StandalonePlaceholderRegularIcon
                        fill="#ffffff"
                        iconSize="sm"
                    />
                }
                message="Enter message here"
                actionText="Action"
                onActionClick={handleActionClick}
                isOpen={isOpen}
                onClose={handleClose}
            />
        </div>
    );
};
