import { renderHook, act, render } from "@testing-library/react";
import { useDropdown } from "..";
import userEvent from "@testing-library/user-event";
import { DropdownProvider } from "@providers/dropdown/dropdownProvider";
import { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
    <DropdownProvider>{children}</DropdownProvider>
);

describe("useDropdown", () => {
    test("should initialize as closed", () => {
        const { result } = renderHook(() => useDropdown(), { wrapper });
        const { isOpen } = result.current;
        expect(isOpen).toBe(false);
    });

    test("should close the dropdown when open and close is called", () => {
        const { result } = renderHook(() => useDropdown(), { wrapper });

        act(() => {
            result.current.open();
        });

        expect(result.current.isOpen).toBe(true);

        act(() => {
            result.current.close();
        });
        expect(result.current.isOpen).toBe(false);
    });

    test("should close the dropdown when clicking outside", async () => {
        const { result } = renderHook(() => useDropdown(), { wrapper });

        const { getByText } = render(
            <div>
                <div ref={result.current.ref} onClick={result.current.open}>
                    inside
                </div>
                <button>outside</button>
            </div>,
        );
        await act(async () => {
            await userEvent.click(getByText("inside"));
        });
        expect(result.current.isOpen).toBe(true);
        await act(async () => {
            await userEvent.click(getByText("outside"));
        });
        expect(result.current.isOpen).toBe(false);
    });

    test("should change the dropdown value", async () => {
        const { result } = renderHook(() => useDropdown(), { wrapper });

        expect(result.current.selectedValue).toBe(undefined);

        act(() => {
            result.current.setSelectedValue("value");
        });

        expect(result.current.selectedValue).toBe("value");

        act(() => {
            result.current.setSelectedValue("selected");
        });

        expect(result.current.selectedValue).toBe("selected");
    });
});
