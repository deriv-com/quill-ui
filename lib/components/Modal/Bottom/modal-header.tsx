import clsx from "clsx";

interface ModalHeaderProps {
    className?: string;
}

export const ModalHeader = ({
    children,
    className,
}: React.PropsWithChildren<ModalHeaderProps>) => {
    return (
        <div className={clsx("quill-modal-bottom__header", className)}>
            {children}
        </div>
    );
};
