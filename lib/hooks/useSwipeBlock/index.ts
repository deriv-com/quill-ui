import { useContext, useEffect, useRef, useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useMediaQuery } from "usehooks-ts";
import { ActionSheetContext } from "@components/ActionSheet/root";

interface SwipeBlockType {
    show?: boolean;
    onClose?: () => void;
    shouldCloseOnDrag?: boolean;
    fullHeightOnOpen?: boolean;
}

export const useSwipeBlock = ({
    show,
    onClose,
    shouldCloseOnDrag,
    fullHeightOnOpen,
}: SwipeBlockType) => {
    const [height, setHeight] = useState("auto");
    const [isScrolled, setIsScrolled] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // TODO: replace this with useScreens when @aizad-deriv is done with it.
    const isLg = useMediaQuery("(min-width: 1024px)");

    const { expandable } = useContext(ActionSheetContext);

    useEffect(() => {
        if (isLg) {
            setHeight("100%");
        }
        if (!isLg && show) {
            fullHeightOnOpen ? setHeight("90dvh") : setHeight("auto");
        }
    }, [show, isLg]);

    // Check element is scrolled or not
    useEffect(() => {
        const element = containerRef.current;

        const handleScroll = () => {
            if (element) {
                const scrolled =
                    element.scrollTop > 0 &&
                    element.scrollTop + element.clientHeight <
                        element.scrollHeight;
                setIsScrolled(scrolled);
            }
        };

        if (element) {
            element.addEventListener("scroll", handleScroll);

            return () => {
                element.removeEventListener("scroll", handleScroll);
            };
        }
    }, [show]);

    const bindHandle = useDrag(
        ({ dragging, distance, initial, xy, cancel }) => {
            const windowHeight =
                typeof window !== "undefined" ? window.innerHeight : 0;

            const clientHeight = containerRef.current?.clientHeight || 0;
            let draggingPoint = clientHeight;
            const isGoingDown =
                initial[1] < xy[1] &&
                Math.abs(initial[1] - xy[1]) > Math.abs(initial[0] - xy[0]);

            if (isGoingDown) {
                draggingPoint = draggingPoint - distance[1];
            } else {
                draggingPoint = draggingPoint + distance[1];
            }

            if (dragging) {
                if (isGoingDown) {
                    if (!shouldCloseOnDrag) return;
                    cancel();
                    onClose?.();
                } else {
                    if (!expandable) return;
                    setHeight(`${draggingPoint}px`);
                }
            } else {
                if (distance[1] === 0) return;
                if (!expandable) return;
                if (!isGoingDown) {
                    if (
                        draggingPoint >= 0 &&
                        draggingPoint <= windowHeight * 0.3
                    ) {
                        setHeight("30dvh");
                    } else if (
                        draggingPoint >= windowHeight * 0.3 &&
                        draggingPoint <= windowHeight * 0.5
                    ) {
                        setHeight("50dvh");
                    } else {
                        setHeight("90dvh");
                    }
                } else {
                    if (draggingPoint <= windowHeight * 0.3) {
                        if (!shouldCloseOnDrag) {
                            if (height === "auto") return;
                            return setHeight("30dvh");
                        }
                        setHeight("0dvh");
                        cancel();
                        onClose?.();
                    } else if (draggingPoint <= windowHeight * 0.5) {
                        setHeight("30dvh");
                    } else {
                        setHeight("50dvh");
                    }
                }
            }
        },
        {
            filterTaps: true,
            rubberband: true,
        },
    );
    return { height, containerRef, bindHandle, isScrolled, isLg };
};
