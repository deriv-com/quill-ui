import { render } from "@testing-library/react";
import { CheckboxGroup } from "../index";

describe("CheckboxGroup", () => {
    const mockProps = {
        className: "checkbox-group--demo",
        checkboxGroupConfig: [
            {
                label: "Parent 1",
                id: 1,
                showInfoIcon: true,
                children: [
                    {
                        label: "Child 1",
                        checked: true,
                        id: 2,
                    },
                    {
                        label: "Child 2",
                        id: 3,
                    },
                    {
                        label: "Child 3",
                        id: 4,
                    },
                ],
            },
            {
                label: "Parent 2",
                id: 5,
                children: [
                    {
                        label: "Child 1",
                        id: 6,
                    },
                ],
            },
            {
                label: "Parent 3",
                id: 7,
                showInfoIcon: true,
                checked: true,
            },
            {
                label: "Parent 4",
                id: 8,
                disabled: true,
                children: [
                    {
                        label: "Child 1",
                        id: 9,
                        showInfoIcon: true,
                    },
                    {
                        label: "Child 2",
                        id: 10,
                    },
                ],
            },
        ],
    };
    beforeAll(() => {
        global.structuredClone = jest.fn((val) =>
            JSON.parse(JSON.stringify(val)),
        );
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    it("should render checkbox components according to passed config", () => {
        const { container } = render(<CheckboxGroup {...mockProps} />);

        expect(container).toMatchSnapshot();
    });
});
