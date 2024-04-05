import RadioGroup from ".";

export default {
    title: "Components/Selection/Radio/RadioGroup",
    component: RadioGroup,
};

export const BasicRadioGroup = () => (
    <RadioGroup
        name="radioGroup"
        onToggle={() => console.log("Toggled!")}
        selected="option1"
    >
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" />
        <RadioGroup.Item value="option3" label="Option 3" />
    </RadioGroup>
);

BasicRadioGroup.storyName = "Basic";

export const DisabledOption = () => (
    <RadioGroup
        name="radioGroup"
        onToggle={() => console.log("Toggled!")}
        selected="option1"
    >
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" disabled />
        <RadioGroup.Item value="option3" label="Option 3" />
    </RadioGroup>
);

DisabledOption.storyName = "With Disabled Option";

export const HiddenOption = () => (
    <RadioGroup
        name="radioGroup"
        onToggle={() => console.log("Toggled!")}
        selected="option1"
    >
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" hidden />
        <RadioGroup.Item value="option3" label="Option 3" />
    </RadioGroup>
);

HiddenOption.storyName = "With Hidden Option";

export const WrappedItems = () => (
    <RadioGroup
        name="radioGroup"
        onToggle={() => console.log("Toggled!")}
        selected="option1"
        shouldWrapItems
    >
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" />
        <RadioGroup.Item value="option3" label="Option 3" />
    </RadioGroup>
);

WrappedItems.storyName = "Wrapped Items";
