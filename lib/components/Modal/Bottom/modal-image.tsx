import clsx from "clsx";

interface ModalBodyProps {
    className?: string;
    src?: string;
    style?: React.CSSProperties;
    height?: string;
}

export const ModalImage = ({
    children,
    className,
    src,
    style,
    height = "var(--temp-static-spacing-202)",
}: React.PropsWithChildren<ModalBodyProps>) => (
    <>
        {src ? (
            <div
                style={{
                    background: `url(${src}) lightgray 50% / cover no-repeat`,
                    height: `${height}`,
                    ...style,
                }}
                className={clsx("quill-modal-bottom__content-image", className)}
                data-testid="dt_modal_image"
            />
        ) : (
            <div
                style={style}
                className={clsx("quill-modal-bottom__content-image", className)}
            >
                {children}
            </div>
        )}
    </>
);
