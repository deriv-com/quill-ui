import { useState, useEffect } from "react";
import clsx from "clsx";
import "./checkbox-group.scss";
import { Checkbox } from "../checkbox-single";
import { CheckboxProps } from "../checkbox-single";

interface Node extends Omit<CheckboxProps, "id" | "children" | "ref"> {
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

    const updateParentState = (parent: ParentNode) => {
        if (!parent.children) return;

        const checkedChildrenSum = parent.children.reduce(
            (acc, subItem) => acc + (subItem.checked ? 1 : 0),
            0,
        );
        if (checkedChildrenSum === parent.children.length) {
            parent.checked = true;
            parent.indeterminate = false;
        } else if (checkedChildrenSum === 0) {
            parent.checked = false;
            parent.indeterminate = false;
        } else {
            parent.indeterminate = true;
        }
    };

    // Update 1) parent if children have field checked:true and it's not reflected in the Parent Node config part or 2) children if Parent is disabled
    const modifyConfig = (config: ParentNode[]) => {
        config.forEach((item) => {
            if (item?.children) {
                updateParentState(item);

                if (item.disabled) {
                    item.children.forEach(
                        (subItem) => (subItem.disabled = true),
                    );
                }
            }
        });
    };

    const handleChildChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLSpanElement>,
        parentId: string | number,
        childId: string | number,
    ) => {
        const configCopy = structuredClone(checkBoxItemsConfig);
        configCopy.forEach((item) => {
            if (item.id === parentId) {
                item.children?.forEach((subItem) => {
                    if (subItem.id === childId) {
                        subItem.checked = !subItem.checked;
                        subItem.onChange?.(e);
                    }
                });
                updateParentState(item);
            }
        });

        setCheckBoxItemConfig(configCopy);
    };

    const handleParentChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLSpanElement>,
        parentId: string | number,
    ) => {
        const configCopy = structuredClone(checkBoxItemsConfig);

        configCopy.forEach((item) => {
            if (item.id === parentId) {
                if (item.indeterminate) {
                    item.checked = false;
                    item.indeterminate = false;
                } else {
                    item.checked = !item.checked;
                }

                item.children?.forEach(
                    (subItem) =>
                        (subItem.checked = item.checked ? true : false),
                );

                item.onChange?.(e);
            }
        });

        setCheckBoxItemConfig(configCopy);
    };

    return (
        <div className={clsx("quill-checkbox-group", className)}>
            {checkBoxItemsConfig.map(({ id, children, ...rest }) => (
                <div key={id}>
                    <Checkbox
                        {...rest}
                        id={id + ""}
                        onChange={(e) => handleParentChange(e, id)}
                    />
                    {children && (
                        <div className="quill-checkbox-group__children-wrapper">
                            {children.map(({ id: subItemId, ...rest }) => (
                                <Checkbox
                                    {...rest}
                                    key={subItemId}
                                    id={subItemId + ""}
                                    onChange={(e) =>
                                        handleChildChange(e, id, subItemId)
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
