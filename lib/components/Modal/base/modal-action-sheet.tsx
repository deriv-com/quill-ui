import ActionSheet from "@components/ActionSheet";
import { BarProps } from "@components/ActionSheet/handle-bar";
import { HeaderProps } from "@components/ActionSheet/header";
import { PortalProps } from "@components/ActionSheet/portal";
import { FooterProps, RootProps } from "@components/ActionSheet/types";
import React, { forwardRef } from "react";

export interface ModalActionSheetProps {
    root?: RootProps;
    header?: HeaderProps;
    footer?: FooterProps;
    handleBar?: BarProps;
    portal?: Omit<PortalProps, "ref">;
    children?: React.ReactNode;
}

const ModalActionSheet = forwardRef<HTMLDivElement, ModalActionSheetProps>(
    ({ root, portal, children, footer }, ref) => {
        return (
            <ActionSheet.Root {...root}>
                <ActionSheet.Portal fullHeightOnOpen {...portal} ref={ref}>
                    {React.Children.map(children, (child: React.ReactNode) => {
                        if (!React.isValidElement(child)) return null;
                        const type = child.type as React.ComponentType;

                        if (type.name === "ModalHeader") {
                            const { title, ...rest } = child.props;
                            return (
                                <ActionSheet.Header title={title} {...rest} />
                            );
                        }

                        if (type.name === "ModalBody") {
                            return (
                                <ActionSheet.Content>
                                    {child.props.children}
                                </ActionSheet.Content>
                            );
                        }
                    })}
                    <ActionSheet.Footer {...footer} />
                </ActionSheet.Portal>
            </ActionSheet.Root>
        );
    },
);

export default ModalActionSheet;
