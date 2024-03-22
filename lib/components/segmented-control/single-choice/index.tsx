import { ReactNode } from "react";
import Group from "./group";

export type SingleChoiceVariants = {
    Group: typeof Group;
};

// TODO: to re-consider the necessity of this component
export const SingleChoice: SingleChoiceVariants = ({
    children,
}: {
    children: ReactNode;
}) => {
    return <>{children}</>;
};

SingleChoice.Group = Group;

export default SingleChoice;
