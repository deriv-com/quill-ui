import { isValidElement } from "react";

export const KEY = {
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_DOWN: "ArrowDown",
    ENTER: "Enter",
    SPACE: " ",
    TAB: "Tab",
    ESCAPE: "Escape",
};

export const reactNodeToString = (reactNode: React.ReactNode): string => {
    let string = "";
    if (typeof reactNode === "string") {
        string = reactNode;
    } else if (typeof reactNode === "number") {
        string = reactNode.toString();
    } else if (reactNode instanceof Array) {
        reactNode.forEach((child) => {
            string += reactNodeToString(child);
        });
    } else if (isValidElement(reactNode)) {
        string += reactNodeToString(reactNode.props.children);
    }
    return string;
};
