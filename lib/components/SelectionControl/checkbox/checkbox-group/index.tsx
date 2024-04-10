import { useState, useEffect } from "react";
import clsx from "clsx";
import { Checkbox } from "../checkbox-single";
import { CheckboxProps } from "../checkbox-single";

interface Node extends Omit<CheckboxProps, "id" | "children"> {
    id: string | number;
}

interface ParentNode extends Node {
    children?: Node[];
}

interface CheckboxGroupProps {
    className?: string;
    checkboxGroupConfig: ParentNode[];
}

//TODO add ref to props?
export const CheckboxGroup = ({
    className,
    checkboxGroupConfig,
}: CheckboxGroupProps) => {
    const [checkBoxItemsConfig, setCheckBoxItemConfig] =
        useState(checkboxGroupConfig);

    useEffect(
        () => setCheckBoxItemConfig(checkboxGroupConfig),
        [checkboxGroupConfig],
    );

    //TODO refactor
    const handleChildChange = (
        parentId: string | number,
        childId: string | number,
    ) => {
        const copy = structuredClone(checkBoxItemsConfig);
        //Changing state among children
        copy.forEach((item) => {
            if (item.id === parentId) {
                item.children?.forEach((subItem) => {
                    if (subItem.id === childId) {
                        subItem.checked = !subItem.checked;
                    }
                });
            }
        });
        //Changing state (unchecked, checked, indeterminate) among parents
        copy.forEach((item) => {
            if (item.id === parentId && item?.children) {
                const checkedChildrenSum = item.children.reduce(
                    (acc, subItem) => acc + (subItem?.checked ? 1 : 0),
                    0,
                );
                if (checkedChildrenSum === item.children.length) {
                    item.checked = true;
                    item.indeterminate = false;
                } else if (checkedChildrenSum === 0) {
                    item.checked = false;
                    item.indeterminate = false;
                } else {
                    item.indeterminate = true;
                }
            }
        });

        setCheckBoxItemConfig(copy);
    };

    //TODO refactor
    const handleParentClick = (parentId: string | number) => {
        const copy = structuredClone(checkBoxItemsConfig);

        copy.forEach((item) => {
            if (item.id === parentId) {
                if (item.indeterminate) {
                    item.checked = false;
                    item.indeterminate = false;
                } else {
                    item.checked = !item.checked;
                }

                if (item.children && item.checked) {
                    item.children.forEach(
                        (subItem) => (subItem.checked = true),
                    );
                } else if (item.children && !item.checked) {
                    item.children.forEach(
                        (subItem) => (subItem.checked = false),
                    );
                }
            }
        });

        setCheckBoxItemConfig(copy);
    };

    //TODO add normal styles
    return (
        <div
            className={clsx("quill-checkbox-group__wrapper", className)}
            style={{ padding: "20px" }}
        >
            {checkBoxItemsConfig.map(({ id, children, ...rest }) => (
                <div key={id} style={{ marginBottom: "10px" }}>
                    <Checkbox
                        onChange={() => handleParentClick(id)}
                        {...rest}
                    />
                    {children && (
                        <div style={{ marginLeft: "20px" }}>
                            {children.map(({ id: subItemId, ...rest }) => (
                                <Checkbox
                                    onChange={() =>
                                        handleChildChange(id, subItemId)
                                    }
                                    {...rest}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
