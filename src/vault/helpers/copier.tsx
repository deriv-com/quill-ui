import { Snackbar } from "@components/Snackbar";
import React from "react";
import ReactDOM from "react-dom";
import { limitTextWithEllipsis } from "../../utils";

const copyToClipboard = (text: string): void => {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            showSnackbar(text);
        })
        .catch((err) => {
            console.error("Failed to copy text: ", err);
        });
};

const showSnackbar = (text: string): void => {
    const snackbarContainer = document.createElement("div");
    snackbarContainer.setAttribute("class", "snackbar-container");
    document.body.appendChild(snackbarContainer);

    ReactDOM.render(
        <Snackbar
            isVisible
            message={`${limitTextWithEllipsis(text, 30)} is copied to clipboard`}
            hasCloseButton={false}
        />,
        snackbarContainer,
    );

    setTimeout(() => {
        ReactDOM.unmountComponentAtNode(snackbarContainer);
        document.body.removeChild(snackbarContainer);
    }, 2000);
};

export default copyToClipboard;
