/* eslint-disable no-undef */
jest.mock("uuid", () => {
    return {
        v4: jest.fn(() => "mock-uuid"),
    };
});
