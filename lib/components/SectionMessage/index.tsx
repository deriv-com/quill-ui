import { ComponentProps, ReactNode } from "react";
import { TMediumSizes } from "@types";
import "./section-message.scss";
import clsx from "clsx";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneCircleExclamationBoldIcon,
    StandaloneCircleInfoBoldIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons/Standalone";
import { Text } from "@components/Typography";
import Link from "@components/Link";
import { LinkProps } from "@components/Link/types";

export type LinkList = {
    id: number;
    linkProps: LinkProps;
};
export interface SectionMessageProps
    extends Omit<ComponentProps<"div">, "title"> {
    title?: string;
    className?: string;
    message: ReactNode;
    size: TMediumSizes;
    status?: "info" | "success" | "danger" | "warning";
    icon?: ReactNode;
    linkList?: LinkList[];
}

const Icons = {
    info: (
        <StandaloneCircleInfoBoldIcon
            fill="var(--core-color-solid-blue-800)"
            iconSize="sm"
        />
    ),
    danger: (
        <StandaloneTriangleExclamationBoldIcon
            fill="var(--core-color-solid-red-800)"
            iconSize="sm"
        />
    ),
    success: (
        <StandaloneCircleCheckBoldIcon
            fill="var(--core-color-solid-green-800)"
            iconSize="sm"
        />
    ),
    warning: (
        <StandaloneCircleExclamationBoldIcon
            fill="var(--core-color-solid-yellow-800)"
            iconSize="sm"
        />
    ),
};

export const SectionMessage = ({
    title,
    message,
    className,
    status,
    icon,
    size = "md",
    linkList,
}: SectionMessageProps) => {
    return (
        <div
            className={clsx(
                "section-message",
                `section-message--${status}`,
                className,
            )}
        >
            {(status || icon) && (
                <div>{status ? Icons?.[status] : icon && icon}</div>
            )}
            <div className="section-message-content">
                <div className="title-and-message">
                    {title && (
                        <Text bold size={size === "md" ? "lg" : "md"}>
                            {title}
                        </Text>
                    )}
                    <Text size={size}>{message}</Text>
                </div>
                {linkList && linkList.length > 0 && (
                    <div className="section-message-links">
                        {linkList.map(({ id, linkProps }) => (
                            <Link key={id} {...linkProps} size={size}>
                                {linkProps.children}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionMessage;
