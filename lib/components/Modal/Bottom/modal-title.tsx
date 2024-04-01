import clsx from "clsx";
import { Heading } from "../../Typography";

interface ModalTitleProps {
    className?: string;
    hasImageAbove?: boolean;
}

export const ModalTitle = ({
    children,
    className,
    hasImageAbove = false,
}: React.PropsWithChildren<ModalTitleProps>) => (
    <Heading.H4
        className={clsx(
            "quill-modal-bottom__content-title",
            { "quill-modal-bottom__content-title--has-image": hasImageAbove },
            className,
        )}
    >
        {children}
    </Heading.H4>
);
