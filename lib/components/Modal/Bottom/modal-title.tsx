import clsx from "clsx";
import { Heading } from "../../Typography";

interface ModalTitleProps {
    className?: string;
}

export const ModalTitle = ({
    children,
    className,
}: React.PropsWithChildren<ModalTitleProps>) => (
    <Heading.H4
        className={clsx("quill-modal-bottom__content-title", className)}
    >
        {children}
    </Heading.H4>
);
