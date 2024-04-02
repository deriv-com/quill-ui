import { renderHook, act } from "@testing-library/react";
import { useSwipeBlock } from "..";

describe("useSwipeBlock", () => {
    it('should set height to "100%" when isLg is true', () => {
        const mediaQueryList = {
            matches: true,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        };

        window.matchMedia = jest.fn().mockImplementation(() => mediaQueryList);

        const { result } = renderHook(() =>
            useSwipeBlock({ show: false, onClose: jest.fn() }),
        );

        act(() => {
            result.current.bindHandle();
        });

        expect(result.current.height).toBe("100%");
    });
    it('should set height to "auto" when isLg is false and show is true', () => {
        const mediaQueryList = {
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        };

        window.matchMedia = jest.fn().mockImplementation(() => mediaQueryList);

        const { result } = renderHook(() =>
            useSwipeBlock({ show: true, onClose: jest.fn() }),
        );

        act(() => {
            result.current.bindHandle();
        });

        expect(result.current.height).toBe("auto");
    });

    it("should initialize isScrolled to false", () => {
        const { result } = renderHook(() => useSwipeBlock({}));

        expect(result.current.isScrolled).toBe(false);
    });
});
