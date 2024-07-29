import clsx from "clsx";
import { Heading } from "@components/Typography";

export interface ModalHeaderProps {
    className?: string;
    height?: string;
    image?: React.ReactNode;
    src?: string;
    style?: React.CSSProperties;
    title?: React.ReactNode;
}

export const ModalHeader = ({
    className,
    height,
    image,
    src,
    style,
    title,
}: React.PropsWithChildren<ModalHeaderProps>) => (
    <>
        {src && (
            <div
                className={clsx(
                    "quill-modal__content-image",
                    height ? height : "quill-modal__content-image-size",
                    className,
                )}
                style={{
                    background: `url(${src}) 50% / cover no-repeat`,
                    backgroundColor: "var(--colour-green-opacity-100)",
                    ...style,
                }}
                data-testid="dt_modal_image"
            />
        )}
        {image && (
            <div
                style={style}
                className={clsx("quill-modal__content-image", className)}
            >
                {image}
            </div>
        )}
        {title && (
            <Heading.H4
                className={clsx(
                    image || src
                        ? "quill-modal__content-title-has-image"
                        : "quill-modal__content-title",
                    className,
                )}
            >
                {title}
            </Heading.H4>
        )}
    </>
);
