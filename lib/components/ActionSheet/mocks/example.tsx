/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentProps, useState } from "react";
import { LabelPairedBarsSmBoldIcon } from "@deriv/quill-icons";
import ActionSheet from "..";
import { ActionSheetContextType } from "../root";
import { Text } from "@components/Typography";
import "./mock.scss";

type ExampleProps = ActionSheetContextType &
    ComponentProps<typeof ActionSheet.Portal> &
    ComponentProps<typeof ActionSheet.Root> &
    ComponentProps<typeof ActionSheet.Footer> &
    ComponentProps<typeof ActionSheet.Header>;

export const ActionSheetExample = ({
    primaryAction,
    secondaryAction,
    alignment,
    description,
    title,
    closeIcon,
    icon,
    iconPosition,
    shouldCloseOnPrimaryButtonClick,
    shouldCloseOnSecondaryButtonClick,
    shouldCloseOnDrag,
    showHandlebar,
    shouldDetectSwipingOnContainer,
    fullHeightOnOpen,
    isPrimaryButtonDisabled,
    isSecondaryButtonDisabled,
    ...props
}: ExampleProps) => {
    const [open, setOpen] = useState<boolean>();
    const openHandler = () => {
        setOpen(true);
    };
    return (
        <>
            <ActionSheet.Root {...props} isOpen={open} onOpen={openHandler}>
                <ActionSheet.Trigger label="Click Here" />
                <ActionSheet.Portal
                    shouldCloseOnDrag={shouldCloseOnDrag}
                    shouldDetectSwipingOnContainer={
                        shouldDetectSwipingOnContainer
                    }
                    showHandlebar={showHandlebar}
                    fullHeightOnOpen={fullHeightOnOpen}
                >
                    <ActionSheet.Header
                        title={title}
                        description={description}
                        closeIcon={closeIcon}
                        icon={icon}
                        iconPosition={iconPosition}
                    />
                    <ActionSheet.Content className="mock-action-sheet--content">
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                    </ActionSheet.Content>
                    <ActionSheet.Footer
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                        alignment={alignment}
                        shouldCloseOnPrimaryButtonClick={
                            shouldCloseOnPrimaryButtonClick
                        }
                        shouldCloseOnSecondaryButtonClick={
                            shouldCloseOnSecondaryButtonClick
                        }
                        isPrimaryButtonDisabled={isPrimaryButtonDisabled}
                        isSecondaryButtonDisabled={isSecondaryButtonDisabled}
                    />
                </ActionSheet.Portal>
            </ActionSheet.Root>
        </>
    );
};

export const ActionSheetExampleWithIconTrigger = ({
    primaryAction,
    secondaryAction,
    alignment,
    description,
    title,
    closeIcon,
    icon,
    iconPosition,
    shouldCloseOnPrimaryButtonClick,
    shouldCloseOnSecondaryButtonClick,
    shouldCloseOnDrag,
    shouldDetectSwipingOnContainer,
    showHandlebar,
    fullHeightOnOpen,
    isPrimaryButtonDisabled,
    isSecondaryButtonDisabled,
    ...props
}: ExampleProps) => {
    return (
        <>
            <ActionSheet.Root {...props}>
                <ActionSheet.Trigger
                    iconComponent={LabelPairedBarsSmBoldIcon}
                    iconClassName="mock-action-sheet--trigger"
                />
                <ActionSheet.Portal
                    shouldCloseOnDrag={shouldCloseOnDrag}
                    shouldDetectSwipingOnContainer={
                        shouldDetectSwipingOnContainer
                    }
                    showHandlebar={showHandlebar}
                    fullHeightOnOpen={fullHeightOnOpen}
                >
                    <ActionSheet.Header
                        title={title}
                        description={description}
                        closeIcon={closeIcon}
                        icon={icon}
                        iconPosition={iconPosition}
                    />
                    <ActionSheet.Content className="mock-action-sheet--content">
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                    </ActionSheet.Content>
                    <ActionSheet.Footer
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                        alignment={alignment}
                        shouldCloseOnPrimaryButtonClick={
                            shouldCloseOnPrimaryButtonClick
                        }
                        shouldCloseOnSecondaryButtonClick={
                            shouldCloseOnSecondaryButtonClick
                        }
                        isPrimaryButtonDisabled={isPrimaryButtonDisabled}
                        isSecondaryButtonDisabled={isSecondaryButtonDisabled}
                    />
                </ActionSheet.Portal>
            </ActionSheet.Root>
        </>
    );
};

export const ActionSheetExampleControlled = ({
    primaryAction,
    secondaryAction,
    alignment,
    description,
    title,
    closeIcon,
    icon,
    iconPosition,
    shouldCloseOnPrimaryButtonClick,
    shouldCloseOnSecondaryButtonClick,
    shouldCloseOnDrag,
    shouldDetectSwipingOnContainer,
    showHandlebar,
    fullHeightOnOpen,
    isPrimaryButtonDisabled,
    isSecondaryButtonDisabled,
    ...props
}: ExampleProps) => {
    return (
        <>
            <ActionSheet.Root {...props}>
                <ActionSheet.Portal
                    shouldCloseOnDrag={shouldCloseOnDrag}
                    shouldDetectSwipingOnContainer={
                        shouldDetectSwipingOnContainer
                    }
                    showHandlebar={showHandlebar}
                    fullHeightOnOpen={fullHeightOnOpen}
                >
                    <ActionSheet.Header
                        title={title}
                        description={description}
                        closeIcon={closeIcon}
                        icon={icon}
                        iconPosition={iconPosition}
                    />
                    <ActionSheet.Content className="mock-action-sheet--content">
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                        <Text size="sm">
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </Text>
                    </ActionSheet.Content>
                    <ActionSheet.Footer
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                        alignment={alignment}
                        shouldCloseOnPrimaryButtonClick={
                            shouldCloseOnPrimaryButtonClick
                        }
                        shouldCloseOnSecondaryButtonClick={
                            shouldCloseOnSecondaryButtonClick
                        }
                        isPrimaryButtonDisabled={isPrimaryButtonDisabled}
                        isSecondaryButtonDisabled={isSecondaryButtonDisabled}
                    />
                </ActionSheet.Portal>
            </ActionSheet.Root>
        </>
    );
};

export default ActionSheetExample;
