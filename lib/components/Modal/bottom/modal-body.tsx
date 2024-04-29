import clsx from "clsx";
import { Text } from "@components/Typography";

export interface ModalBodyProps {
    className?: string;
}

export const ModalBody = ({
    children,
    className,
}: React.PropsWithChildren<ModalBodyProps>) => (
    <Text
        size="md"
        as="div"
        className={clsx("quill-modal-bottom__content-body", className)}
    >
        {children}
    </Text>
);
