import {
    screen,
    render as rtlRender,
    RenderResult,
    RenderOptions,
    act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RootPosition, RootProps } from "../../types";
import ActionSheet from "@components/ActionSheet";

const dialog_state = {
    open: "open",
    close: "close",
};

const button_name = {
    trigger: "Trigger",
    close: "Close",
};

const overlay = "dt-actionsheet-overlay";

const render = (
    ui: React.ReactElement,
    options?: RenderOptions & {
        wrapperProps?: RootProps;
    },
): RenderResult => {
    const { wrapperProps, ...renderOptions } = options || {};
    return rtlRender(ui, {
        wrapper: (props: RootProps) => (
            <ActionSheet.Root {...props} {...wrapperProps} />
        ),
        ...renderOptions,
    });
};

jest.mock("usehooks-ts", () => ({
    ...jest.requireActual("usehooks-ts"),
    useSsr: jest.fn().mockImplementation(() => ({
        isServer: false,
    })),
}));

describe("<ActionSheet.Portal/>", () => {
    it('should set the data-state attribute to "open" when the show is true', async () => {
        render(
            <>
                <ActionSheet.Trigger>{button_name.trigger}</ActionSheet.Trigger>
                <ActionSheet.Portal>Portal</ActionSheet.Portal>
            </>,
        );

        const trigger = screen.getByText(button_name.trigger);
        await act(async () => {
            await userEvent.click(trigger);
        });
        const state = screen.getByRole("dialog").getAttribute("data-state");

        expect(state).toBe(dialog_state.open);
    });

    it("should not render the component if show is false", async () => {
        render(
            <>
                <ActionSheet.Trigger>{button_name.trigger}</ActionSheet.Trigger>
                <ActionSheet.Portal>
                    <ActionSheet.Header closeIcon={button_name.close} />
                </ActionSheet.Portal>
            </>,
        );

        const trigger = screen.getByText(button_name.trigger);
        await act(async () => {
            await userEvent.click(trigger);
        });
        const close = screen.getByText(button_name.close);
        await act(async () => {
            await userEvent.click(close);
        });

        expect(screen.queryByText(button_name.close)).not.toBeInTheDocument();
    });
    it("should render overlay when type prop is modal", async () => {
        render(
            <>
                <ActionSheet.Trigger>{button_name.trigger}</ActionSheet.Trigger>
                <ActionSheet.Portal>Portal</ActionSheet.Portal>
            </>,
            {
                wrapperProps: {
                    type: "modal",
                },
            },
        );

        const trigger = screen.getByText(button_name.trigger);
        await act(async () => {
            await userEvent.click(trigger);
        });
        const modalOverlay = screen.getByTestId(overlay);

        expect(modalOverlay).toBeInTheDocument();
    });
    it("should not render overlay when type prop is non-modal", async () => {
        render(
            <>
                <ActionSheet.Trigger>{button_name.trigger}</ActionSheet.Trigger>
                <ActionSheet.Portal>Portal</ActionSheet.Portal>
            </>,
            {
                wrapperProps: {
                    type: "non-modal",
                },
            },
        );

        const trigger = screen.getByText(button_name.trigger);
        await act(async () => {
            await userEvent.click(trigger);
        });
        const modalOverlay = screen.queryByTestId(overlay);

        expect(modalOverlay).not.toBeInTheDocument();
    });
    it("should close the action sheet when user clicked on overlay", async () => {
        render(
            <>
                <ActionSheet.Trigger>Trigger</ActionSheet.Trigger>
                <ActionSheet.Portal>Portal</ActionSheet.Portal>
            </>,
        );

        const trigger = screen.getByText(button_name.trigger);
        await act(async () => {
            await userEvent.click(trigger);
        });
        const modalOverlay = screen.getByTestId(overlay);
        await act(async () => {
            await userEvent.click(modalOverlay);
        });
        const state = screen.getByRole("dialog").getAttribute("data-state");

        expect(state).toBe(dialog_state.close);
    });
    it("should render handle bar when expandable prop is true", async () => {
        render(
            <>
                <ActionSheet.Trigger>Trigger</ActionSheet.Trigger>
                <ActionSheet.Portal>Portal</ActionSheet.Portal>
            </>,
            {
                wrapperProps: { expandable: true },
            },
        );
        const trigger = screen.getByText(button_name.trigger);
        await act(async () => {
            await userEvent.click(trigger);
        });
        const handleBar = screen.getByTestId("dt-actionsheet-handle-bar");

        expect(handleBar).toBeInTheDocument();
    });
    it("should not render handle bar when showHandlebar prop is false", async () => {
        render(
            <>
                <ActionSheet.Trigger>Trigger</ActionSheet.Trigger>
                <ActionSheet.Portal showHandlebar={false}>
                    Portal
                </ActionSheet.Portal>
            </>,
        );
        const trigger = screen.getByText(button_name.trigger);
        await act(async () => {
            await userEvent.click(trigger);
        });

        const handleBar = screen.queryByTestId("dt-actionsheet-handle-bar");
        expect(handleBar).not.toBeInTheDocument();
    });

    const positions: RootPosition[] = ["left", "right"];
    positions.forEach((position) => {
        it(`should render correctly with position ${position}`, () => {
            render(
                <ActionSheet.Root isOpen>
                    <ActionSheet.Portal>
                        <p>{position} portal</p>
                    </ActionSheet.Portal>
                </ActionSheet.Root>,
                {
                    wrapperProps: {
                        position,
                    },
                },
            );
            const actionRoot = screen.getByText(`${position} portal`);
            expect(actionRoot).toMatchSnapshot();
        });
    });
});
