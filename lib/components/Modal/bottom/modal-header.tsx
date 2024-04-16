import clsx from "clsx";
import { Heading } from "@components/Typography";

interface ModalHeaderProps {
    className?: string;
    height?: string;
    image?: React.ReactNode;
    src?: string;
    style?: React.CSSProperties;
    title?: React.ReactNode;
}

export const ModalHeader = ({
    className,
    height = "var(--temp-static-spacing-202)",
    image,
    src,
    style,
    title,
}: React.PropsWithChildren<ModalHeaderProps>) => (
    <>
        {src && (
            <div
                style={{
                    background: `url(${src}) lightgray 50% / cover no-repeat`,
                    height: `${height}`,
                    ...style,
                }}
                className={clsx("quill-modal-bottom__content-image", className)}
                data-testid="dt_modal_image"
            />
        )}
        {image && (
            <div
                style={style}
                className={clsx("quill-modal-bottom__content-image", className)}
            >
                {image}
            </div>
        )}
        {title && (
            <Heading.H4
                className={clsx("quill-modal-bottom__content-title", className)}
            >
                {title}
            </Heading.H4>
        )}
    </>
);
