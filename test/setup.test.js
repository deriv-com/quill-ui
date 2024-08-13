import "@testing-library/jest-dom";
import "mock-match-media/jest-setup";

global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};
