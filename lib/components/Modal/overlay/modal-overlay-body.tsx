import clsx from "clsx";
import { Text } from "@components/Typography";

export interface ModalOverlayBodyProps {
    className?: string;
}

export const ModalOverlayBody = ({
    children,
    className,
}: React.PropsWithChildren<ModalOverlayBodyProps>) => (
    <Text
        size="md"
        as="div"
        className={clsx("quill-modal-overlay__content-body", className)}
    >
        {children}
    </Text>
);
