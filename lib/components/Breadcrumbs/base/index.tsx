import { BreadcrumbProps, LinkProps } from "../types";
import { Fragment, useEffect, useState } from "react";
import { maxMobileLinks, maxDesktopLinks } from "./constants";
import "./breadcrumbs.scss";
import useBreakpoints from "@hooks/useBreakpoints";
import clsx from "clsx";
import { LabelPairedChevronRightSmRegularIcon } from "@deriv/quill-icons/LabelPaired";
import { Text } from "@components/Typography";

export function Base({ links = [], className }: BreadcrumbProps) {
    const [renderLinks, setRenderLinks] = useState<LinkProps[]>([]);
    const [dropdownLinks, setDropdownLinks] = useState<LinkProps[]>([]);

    const isLastItem = (key: number) => renderLinks.length - 1 > key;
    const linksLen = links.length;
    const { isMobile } = useBreakpoints();
    const maxLinks = isMobile ? maxMobileLinks : maxDesktopLinks;
    const hasExtra = maxLinks < linksLen;

    useEffect(() => {
        setRenderLinks(links);

        if (hasExtra) {
            const limitedLinks = [
                links[0],
                { content: "...", href: "" },
                links[linksLen - 2],
                links[linksLen - 1],
            ];

            setRenderLinks(limitedLinks);

            const remainingLinks: LinkProps[] = links.filter(
                (item) => !new Set(limitedLinks).has(item),
            );

            setDropdownLinks(remainingLinks);
        }
    }, [links]);

    return (
        <div className={clsx("quill-breadcrumb--container", className)}>
            {renderLinks.map(({ content, href, target }, lk) => (
                <Fragment key={`breadcrumbs-${content}`}>
                    {hasExtra && lk === 1 && (
                        <select
                            className="quill-breadcrumb--dropdown"
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>,
                            ) => {
                                if (typeof window !== "undefined") {
                                    const url = e.target.value;
                                    try {
                                        const sanitizedUrl = new URL(
                                            url,
                                            window.location.origin,
                                        );
                                        window.location.href =
                                            sanitizedUrl.href;
                                    } catch (err) {
                                        console.error("Invalid URL:", url);
                                    }
                                }
                            }}
                        >
                            {dropdownLinks.map(({ href, content }) => {
                                return (
                                    <option
                                        key={`dropdown-${content}`}
                                        value={href}
                                    >
                                        {content}
                                    </option>
                                );
                            })}
                        </select>
                    )}

                    <a
                        href={href}
                        target={target ? target : "_self"}
                        className={clsx(
                            "quill-breadcrumb--item",
                            !isLastItem(lk) &&
                                "quill-breadcrumb--item--disabled",
                        )}
                    >
                        <Text>{content}</Text>
                    </a>
                    <LabelPairedChevronRightSmRegularIcon
                        data-testid="dt-link-chevron"
                        className={clsx(
                            !isLastItem(lk) && "quill-breadcrumb--chevron",
                        )}
                        fill="var(--component-textIcon-normal-subtle)"
                    />
                </Fragment>
            ))}
        </div>
    );
}

export default Base;
