import clsx from "clsx";

interface ModalBodyProps {
    className?: string;
    src?: string;
    height?: string;
}

export const ModalImage = ({
    children,
    className,
    src,
    height = "var(--temp-static-spacing-210)",
}: React.PropsWithChildren<ModalBodyProps>) => (
    <>
        {src ? (
            <div
                className={clsx("quill-modal-bottom__content-image", className)}
                data-testid="dt_modal_image"
                style={{
                    background: `url(${src}) lightgray 50% / cover no-repeat`,
                    height: `${height}`,
                }}
            />
        ) : (
            <div
                className={clsx("quill-modal-bottom__content-image", className)}
            >
                {children}
            </div>
        )}
    </>
);
