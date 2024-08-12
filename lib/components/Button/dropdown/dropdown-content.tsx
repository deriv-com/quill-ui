import {
    DropdownItem,
    DropdownTitle,
    ItemContainer,
    ItemContainerProps,
} from "@components/Atom";
import { useDropdown } from "@hooks/useDropdown";
import clsx from "clsx";
import { ButtonDropdownProps } from ".";
import useBreakpoints from "@hooks/useBreakpoints";

const DropdownContent = ({
    options,
    size,
    closeContentOnClick,
    height,
    label,
    className,
    checkbox,
    onItemClick,
    ...rest
}: ButtonDropdownProps & ItemContainerProps) => {
    const { close } = useDropdown();
    const { isMobile } = useBreakpoints();

    const Content = () => (
        <>
            {label && <DropdownTitle label={label} size={size} />}
            {options.map((item) => {
                const { id, selected, onClick, ...itemProps } = item;
                return (
                    <DropdownItem
                        size={size}
                        key={item.id}
                        onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                        ) => {
                            closeContentOnClick && close();
                            onItemClick?.(id);
                            onClick?.(e);
                        }}
                        as="button"
                        selected={checkbox && selected}
                        checkbox={checkbox}
                        {...rest}
                        {...itemProps}
                    />
                );
            })}
        </>
    );

    return (
        <div className="quill__dropdown-button__items-container">
            {!isMobile ? (
                <ItemContainer
                    size={size}
                    className={clsx(
                        "quill__dropdown-button__items-container-component",
                        className,
                    )}
                    height={height}
                >
                    <Content />
                </ItemContainer>
            ) : (
                <Content />
            )}
        </div>
    );
};

export default DropdownContent;
