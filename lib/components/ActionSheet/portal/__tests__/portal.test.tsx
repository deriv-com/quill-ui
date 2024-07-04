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
                <ActionSheet.Trigger>Trigger</ActionSheet.Trigger>
                <ActionSheet.Portal>Portal</ActionSheet.Portal>
            </>,
        );
        const trigger = screen.getByText("Trigger");
        await act(async () => {
            await userEvent.click(trigger);
        });
        const state = screen.getByRole("dialog").getAttribute("data-state");
        expect(state).toBe("open");
    });

    it('should set the data-state attribute to "close" when the show is false', async () => {
        render(
            <>
                <ActionSheet.Trigger>Trigger</ActionSheet.Trigger>
                <ActionSheet.Portal>
                    <ActionSheet.Header closeIcon="Close" />
                </ActionSheet.Portal>
            </>,
        );
        const trigger = screen.getByText("Trigger");
        await act(async () => {
            await userEvent.click(trigger);
        });
        const close = screen.getByText("Close");
        await act(async () => {
            await userEvent.click(close);
        });
        const state = screen.getByRole("dialog").getAttribute("data-state");
        expect(state).toBe("close");
    });
    it("should render overlay when type prop is modal", () => {
        render(<ActionSheet.Portal>Portal</ActionSheet.Portal>, {
            wrapperProps: {
                type: "modal",
            },
        });
        const modalOverlay = screen.getByTestId("dt-actionsheet-overlay");
        expect(modalOverlay).toBeInTheDocument();
    });
    it("should not render overlay when type prop is non-modal", () => {
        render(<ActionSheet.Portal>Portal</ActionSheet.Portal>, {
            wrapperProps: {
                type: "non-modal",
            },
        });
        const modalOverlay = screen.queryByTestId("dt-actionsheet-overlay");
        expect(modalOverlay).not.toBeInTheDocument();
    });
    it("should close the action sheet when user clicked on overlay", async () => {
        render(
            <>
                <ActionSheet.Trigger>Trigger</ActionSheet.Trigger>
                <ActionSheet.Portal>Portal</ActionSheet.Portal>
            </>,
        );
        const trigger = screen.getByText("Trigger");
        await act(async () => {
            await userEvent.click(trigger);
        });
        const modalOverlay = screen.getByTestId("dt-actionsheet-overlay");
        await act(async () => {
            await userEvent.click(modalOverlay);
        });
        const state = screen.getByRole("dialog").getAttribute("data-state");
        expect(state).toBe("close");
    });
    it("should render handle bar when expandable prop is true", () => {
        render(<ActionSheet.Portal>Portal</ActionSheet.Portal>, {
            wrapperProps: { expandable: true },
        });
        const handleBar = screen.getByTestId("dt-actionsheet-handle-bar");
        expect(handleBar).toBeInTheDocument();
    });
    it("should not render handle bar when showHandlebar prop is false", () => {
        render(
            <ActionSheet.Portal showHandlebar={false}>
                Portal
            </ActionSheet.Portal>,
        );
        const handleBar = screen.queryByTestId("dt-actionsheet-handle-bar");
        expect(handleBar).not.toBeInTheDocument();
    });

    const positions: RootPosition[] = ["left", "right"];
    positions.forEach((position) => {
        it(`should render correctly with position ${position}`, () => {
            render(
                <ActionSheet.Portal>
                    <p>{position} portal</p>
                </ActionSheet.Portal>,
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
