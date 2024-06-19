import { render } from "@testing-library/react";
import TextFieldAddon, { TextFieldAddonProps } from "..";
import React from "react";

describe('TextFieldAddon component', () => {
    const defaultProps: TextFieldAddonProps = {
        addonLabel: 'Test Label',
        addOnPosition: 'left',
        variant: 'outline',
        inputSize: 'md',
    };

    it('should render correctly with default props', () => {
        const { getByText, container } = render(<TextFieldAddon {...defaultProps} />);
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with the addon on the right', () => {
        const props: TextFieldAddonProps = { ...defaultProps, addOnPosition: 'right' };
        const { getByText, container } = render(<TextFieldAddon {...props} />);
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with a different variant', () => {
        const props: TextFieldAddonProps = { ...defaultProps, variant: 'fill' };
        const { getByText, container } = render(<TextFieldAddon {...props} />);
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should render with a right icon', () => {
        const props = { ...defaultProps, rightIcon: <span className="test-icon">Icon</span> };
        const { getByText, container } = render(<TextFieldAddon {...props} />);
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(getByText('Icon')).toBeInTheDocument();
        expect(container.firstChild).toMatchSnapshot();
    });

})