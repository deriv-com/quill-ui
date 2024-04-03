import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";
import "./content.scss";

type ContentProps = ComponentPropsWithoutRef<"div">;

const Content = ({ className, ...props }: ContentProps) => {
    return (
        <div className={clsx("action-sheet--content", className)} {...props} />
    );
};

export default Content;
