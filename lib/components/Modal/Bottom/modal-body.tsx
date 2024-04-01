import clsx from "clsx";
import { Text } from "../../Typography";

interface ModalBodyProps {
    className?: string;
}

export const ModalBody = ({
    children,
    className,
}: React.PropsWithChildren<ModalBodyProps>) => (
    <Text
        size="md"
        as="div"
        className={clsx("quill-modal-bottom__body", className)}
    >
        {children}
    </Text>
);
