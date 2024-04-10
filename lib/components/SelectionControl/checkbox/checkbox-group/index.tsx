import { useState, useEffect } from "react";
import clsx from "clsx";
import "./checkbox-group.scss";
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

export const CheckboxGroup = ({
    className,
    checkboxGroupConfig,
}: CheckboxGroupProps) => {
    const [checkBoxItemsConfig, setCheckBoxItemConfig] =
        useState(checkboxGroupConfig);

    useEffect(() => {
        const configCopy = structuredClone(checkBoxItemsConfig);
        modifyConfig(configCopy);
        setCheckBoxItemConfig(configCopy);
    }, [checkboxGroupConfig]);

    // Update 1) parent if children have field checked:true and it's not reflected in the Parent Node config part or 2) children if Parent is disabled
    const modifyConfig = (config: ParentNode[]) => {
        config.forEach((item) => {
            if (item?.children) {
                // handling state
                const checkedChildrenSum = item.children.reduce(
                    (acc, subItem) => acc + (subItem.checked ? 1 : 0),
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

                // handling disabling: if Parent Node has field disabled: true, then all children should be disabled too.
                if (item.disabled) {
                    item.children.forEach(
                        (subItem) => (subItem.disabled = true),
                    );
                }
            }
        });
    };
    //TODO refactor
    const handleChildChange = (
        parentId: string | number,
        childId: string | number,
    ) => {
        const configCopy = structuredClone(checkBoxItemsConfig);
        configCopy.forEach((item) => {
            if (item.id === parentId) {
                item.children?.forEach((subItem) => {
                    if (subItem.id === childId) {
                        subItem.checked = !subItem.checked;
                    }
                });
            }
        });

        modifyConfig(configCopy);
        setCheckBoxItemConfig(configCopy);
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

    return (
        <div className={clsx("quill-checkbox-group", className)}>
            {checkBoxItemsConfig.map(({ id, children, ...rest }) => (
                <div key={id}>
                    <Checkbox
                        {...rest}
                        id={id + ""}
                        onChange={() => handleParentClick(id)}
                    />
                    {children && (
                        <div className="quill-checkbox-group__children-wrapper">
                            {children.map(({ id: subItemId, ...rest }) => (
                                <Checkbox
                                    {...rest}
                                    id={subItemId + ""}
                                    onChange={() =>
                                        handleChildChange(id, subItemId)
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
