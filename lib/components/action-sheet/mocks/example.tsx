/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentProps, useState } from "react";
import {
    StandaloneXmarkRegularIcon,
    LabelPairedBarsSmBoldIcon,
} from "@deriv/quill-icons";
import ActionSheet from "..";
import { ActionSheetContextType } from "../root";

type ExampleProps = ActionSheetContextType &
    ComponentProps<typeof ActionSheet.Root> &
    ComponentProps<typeof ActionSheet.Footer>;

export const ActionSheetExample = ({
    primaryAction,
    secondaryAction,
    alignment,
    ...props
}: ExampleProps) => {
    return (
        <>
            <ActionSheet.Root {...props}>
                <ActionSheet.Trigger>Click Here</ActionSheet.Trigger>
                <ActionSheet.Portal>
                    <ActionSheet.Close aria-label="close">
                        <StandaloneXmarkRegularIcon />
                    </ActionSheet.Close>
                    <ActionSheet.Header className="py-400 text-center">
                        <div className="relative py-1100">
                            <h3 className="ml-auto">Title</h3>
                        </div>
                        <p>Description</p>
                    </ActionSheet.Header>
                    <ActionSheet.Content className="flex flex-col gap-500 py-800">
                        <p>
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </p>
                        <p>
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </p>
                        <p>
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </p>
                        <p>
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </p>
                    </ActionSheet.Content>
                    <ActionSheet.Footer
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                        alignment={alignment}
                    />
                </ActionSheet.Portal>
            </ActionSheet.Root>
        </>
    );
};

export const ActionSheetExampleTwo = ({
    primaryAction,
    secondaryAction,
    alignment,
    ...props
}: ExampleProps) => {
    const [open, setOpen] = useState<boolean>();
    const openHandler = () => {
        setOpen(true);
    };
    return (
        <>
            <ActionSheet.Root {...props} isOpen={open} onOpen={openHandler}>
                <ActionSheet.Trigger>Click Here</ActionSheet.Trigger>
                <ActionSheet.Portal>
                    <ActionSheet.Close aria-label="close">
                        <StandaloneXmarkRegularIcon />
                    </ActionSheet.Close>
                    <ActionSheet.Header className="py-400 text-center">
                        <div className="relative py-1100">
                            <h3 className="ml-auto">Title</h3>
                        </div>
                        <p>Description</p>
                        <button onClick={() => setOpen(false)}>close</button>
                    </ActionSheet.Header>
                    <ActionSheet.Content className="flex flex-col gap-500 py-800">
                        <p>
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </p>
                        <p>
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </p>
                        <p>
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </p>
                        <p>
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </p>
                    </ActionSheet.Content>
                    <ActionSheet.Footer
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                        alignment={alignment}
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
    ...props
}: ExampleProps) => {
    return (
        <>
            <ActionSheet.Root {...props}>
                <ActionSheet.Trigger
                    iconComponent={LabelPairedBarsSmBoldIcon}
                    iconClassName="fill-solid-red-500"
                    iconSize="sm"
                />
                <ActionSheet.Portal>
                    <ActionSheet.Close aria-label="close">
                        <StandaloneXmarkRegularIcon />
                    </ActionSheet.Close>
                    <ActionSheet.Header className="py-400 text-center">
                        <div className="relative py-1100">
                            <h3 className="ml-auto">Title</h3>
                        </div>
                        <p>Description</p>
                    </ActionSheet.Header>
                    <ActionSheet.Content className="flex flex-col gap-500 py-800">
                        <p>
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </p>
                        <p>
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </p>
                        <p>
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </p>
                        <p>
                            Bottom sheet is a surface fixed at the bottom of the
                            screen which includes content related to the
                            previous screen.
                        </p>
                    </ActionSheet.Content>
                    <ActionSheet.Footer
                        primaryAction={primaryAction}
                        secondaryAction={secondaryAction}
                        alignment={alignment}
                    />
                </ActionSheet.Portal>
            </ActionSheet.Root>
        </>
    );
};

export default ActionSheetExample;
