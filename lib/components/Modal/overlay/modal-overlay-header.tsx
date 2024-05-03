import clsx from "clsx";
import { Heading } from "@components/Typography";

export interface ModalOverlayHeaderProps {
    className?: string;
    height?: string;
    image?: React.ReactNode;
    src?: string;
    style?: React.CSSProperties;
    title?: React.ReactNode | undefined;
}

export const ModalOverlayHeader = ({
    className,
    height = "var(--temp-static-spacing-202)",
    image,
    src,
    style,
    title,
}: ModalOverlayHeaderProps) => {
    return (
        <>
            {src && (
                <div
                    style={{
                        background: `url(${src}) lightgray 50% / cover no-repeat`,
                        height: `${height}`,
                        ...style,
                    }}
                    className={clsx(
                        "quill-modal-overlay__content-image",
                        className,
                    )}
                    data-testid="dt_modal_image"
                />
            )}
            {image && (
                <div
                    style={style}
                    className={clsx(
                        "quill-modal-overlay__content-image",
                        className,
                    )}
                >
                    {image}
                </div>
            )}
            {title && (
                <Heading.H4
                    className={clsx(
                        "quill-modal-overlay__content-title",
                        className,
                    )}
                >
                    {title}
                </Heading.H4>
            )}
        </>
    );
};
