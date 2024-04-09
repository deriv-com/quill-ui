import { ReactNode, useState } from "react";
import clsx from "clsx";
import { Checkbox } from "../checkbox-single";

interface CheckboxGroupProps {
    className?: string;
}

interface ParentNode {
    label: ReactNode;
    id: string | number;
    indeterminate?: boolean;
    checked?: boolean;
    children?: { label: string; checked?: boolean; id: string | number }[];
}

const config: ParentNode[] = [
    {
        label: "Parent1",
        id: 1,
        indeterminate: true,
        children: [
            {
                label: "Child p1.c1",
                checked: true,
                id: 2,
            },
            {
                label: "Child p1.c2",
                id: 3,
            },
            {
                label: "Child p1.c3",
                id: 4,
            },
        ],
    },
    {
        label: "Parent2",
        id: 5,
        children: [
            {
                label: "Child p2.c1",
                id: 6,
            },
        ],
    },
    {
        label: "Parent3",
        id: 7,
    },
];
//TODO add other props to config
//TODO add config to props, add note that it should be new every time
export const CheckboxGroup = ({ className }: CheckboxGroupProps) => {
    const [checkBoxItemsConfig, setCheckBoxItemConfig] = useState(config);

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
            style={{ padding: "20px", backgroundColor: "#f5f5f5" }}
        >
            {checkBoxItemsConfig.map((item) => (
                <div key={item.id} style={{ marginBottom: "10px" }}>
                    <Checkbox
                        label={item.label}
                        indeterminate={item?.indeterminate}
                        checked={item?.checked}
                        onChange={() => handleParentClick(item.id)}
                    />
                    {item.children && (
                        <div style={{ marginLeft: "20px" }}>
                            {item.children.map((subItem) => (
                                <Checkbox
                                    label={subItem.label}
                                    key={subItem.id}
                                    checked={subItem?.checked}
                                    onChange={() =>
                                        handleChildChange(item.id, subItem.id)
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
