import { render, screen } from "@testing-library/react";
import { BasicStepper } from "../../index";
import { Steps } from "../../types";

describe("BasicStepper component", () => {

    const props = {
        currentStep: 1,
        labels: ['Step 1', 'Step 2', 'Step 3'],
        allSteps: Steps,
    };

    it("renders steps correctly", () => {
        render(<BasicStepper {...props} />);
        expect(screen.getByText("Step 1")).toBeInTheDocument();
        expect(screen.getByText("Step 2")).toBeInTheDocument();
    });

    it("marks active step correctly", () => {
        render(<BasicStepper {...props} />);
        const activeCircle = screen.getAllByTestId("dt-step-circle")[0];
        expect(activeCircle).toHaveClass("step-circle--active");
    });

    it("disables future steps correctly", () => {
        render(<BasicStepper {...props} currentStep={0} size={"sm"} />);
        const futureStep = screen.getAllByTestId("dt-step-line")[0];
        screen.debug()
        expect(futureStep).toHaveClass("step-line--disabled");
    });

    it("renders custom icons correctly", () => {
        const CustomIcon = () => <div data-testid="custom-icon">Custom</div>;
        render(<BasicStepper {...props} Icon={CustomIcon} size={"sm"} />);
        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("matches snapshot", () => {
        const { container } = render(<BasicStepper {...props} size={"sm"} />);
        expect(container).toMatchSnapshot();
    });

});
