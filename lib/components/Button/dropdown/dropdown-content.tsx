import {
    DropdownItem,
    DropdownItemProps,
    DropdownTitle,
    ItemContainer,
    ItemContainerProps,
} from "@components/Atom";
import { useDropdown } from "@hooks/useDropdown";
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
    centered,
    ...rest
}: ButtonDropdownProps & ItemContainerProps & DropdownItemProps) => {
    const { close } = useDropdown();
    const { isMobile } = useBreakpoints();

    const Content = () => (
        <>
            {!isMobile && label && (
                <DropdownTitle label={label} size={size} centered={centered} />
            )}
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
                        centered={centered}
                        {...rest}
                        {...itemProps}
                    />
                );
            })}
        </>
    );

    return (
        <>
            {!isMobile ? (
                <ItemContainer
                    size={size}
                    className={className}
                    height={height}
                >
                    <Content />
                </ItemContainer>
            ) : (
                <Content />
            )}
        </>
    );
};

export default DropdownContent;
