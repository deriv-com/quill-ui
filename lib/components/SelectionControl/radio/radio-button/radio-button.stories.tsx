import RadioButton from ".";

export default {
    title: "Components/Selection/Radio/RadioButton",
    component: RadioButton,
};

export const DefaultButton = () => (
    <RadioButton id="radio-1" defaultChecked={true}>
        Option 1
    </RadioButton>
);
DefaultButton.storyName = "Default";

export const UncheckedButton = () => (
    <RadioButton id="radio-2" defaultChecked={false}>
        Option 2
    </RadioButton>
);
UncheckedButton.storyName = "Unchecked";

export const CustomClassButton = () => (
    <RadioButton id="radio-3" defaultChecked={false} className="custom-radio">
        Custom Option
    </RadioButton>
);
CustomClassButton.storyName = "Custom Class";

export const CustomLabelClassButton = () => (
    <RadioButton
        id="radio-4"
        defaultChecked={true}
        classNameLabel="custom-label"
    >
        Option 4
    </RadioButton>
);
CustomLabelClassButton.storyName = "Custom Label Class";

export const DisabledButton = () => (
    <RadioButton id="radio-5" defaultChecked={true} disabled>
        Disabled Option
    </RadioButton>
);

export const ButtonWithInfo = () => (
    <RadioButton id="radio-6" defaultChecked={false} has_info>
        Option With Info
    </RadioButton>
);
DisabledButton.storyName = "Disabled";
