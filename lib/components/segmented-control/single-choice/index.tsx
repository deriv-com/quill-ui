import { ReactNode } from "react";
import GroupWithIconsOnly from "./group-with-icons-only";
import GroupWithLabelsOnly from "./group-with-labels-only";
import GroupWithIconsAndLabels from "./group-with-icons-and-labels";

export type SingleChoiceVariants = {
    GroupWithIconsOnly: typeof GroupWithIconsOnly;
    GroupWithLabelsOnly: typeof GroupWithLabelsOnly;
    GroupWithIconsAndLabels: typeof GroupWithIconsAndLabels;
};

// TODO: to re-consider the necessity of this component
export const SingleChoice: SingleChoiceVariants = ({
    children,
}: {
    children: ReactNode;
}) => {
    return <>{children}</>;
};

SingleChoice.GroupWithIconsOnly = GroupWithIconsOnly;
SingleChoice.GroupWithLabelsOnly = GroupWithLabelsOnly;
SingleChoice.GroupWithIconsAndLabels = GroupWithIconsAndLabels;

export default SingleChoice;
