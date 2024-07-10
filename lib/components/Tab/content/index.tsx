import { Children, ComponentProps, forwardRef, useContext } from "react";
import { TabContext } from "@components/Tab/container";

type ContentProps = ComponentProps<"div">;

export const TabContent = forwardRef<HTMLDivElement, ContentProps>(
    ({ children, className }, ref) => {
        const { activeTab } = useContext(TabContext);
        const childArr = Children.toArray(children);
        const activeChild = childArr.find((_el, i) => i === activeTab);

        return (
            <div className={className} ref={ref}>
                {activeChild}
            </div>
        );
    },
);

TabContent.displayName = "TabContent";
