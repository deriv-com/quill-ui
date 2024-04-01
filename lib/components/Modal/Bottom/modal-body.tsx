import clsx from "clsx";

interface ModalBodyProps {
    className?: string;
}

export const ModalBody = ({
    children,
    className,
}: React.PropsWithChildren<ModalBodyProps>) => {
    return (
        <div className={clsx("quill-modal-bottom__body", className)}>
            {children}
        </div>
    );
};
