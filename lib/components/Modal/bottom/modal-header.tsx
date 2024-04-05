import clsx from "clsx";
import { Heading } from "../../Typography";

interface ModalBodyProps {
    className?: string;
    src?: string;
    style?: React.CSSProperties;
    height?: string;
    hasImg?: boolean;
    title?: React.ReactNode;
}

export const ModalHeader = ({
    children,
    className,
    src,
    style,
    height = "var(--temp-static-spacing-202)",
    hasImg,
    title,
}: React.PropsWithChildren<ModalBodyProps>) => (
    <>
        {hasImg && (
            <>
                {src ? (
                    <div
                        style={{
                            background: `url(${src}) lightgray 50% / cover no-repeat`,
                            height: `${height}`,
                            ...style,
                        }}
                        className={clsx(
                            "quill-modal-bottom__content-image",
                            className,
                        )}
                        data-testid="dt_modal_image"
                    />
                ) : (
                    <div
                        style={style}
                        className={clsx(
                            "quill-modal-bottom__content-image",
                            className,
                        )}
                    >
                        {children}
                    </div>
                )}
            </>
        )}
        <Heading.H4
            className={clsx("quill-modal-bottom__content-title", className)}
        >
            {title}
        </Heading.H4>
    </>
);
