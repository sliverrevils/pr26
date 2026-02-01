import { useEffect, useRef } from "react";

export function useScrollEndOnBody(
    callback: () => void,
    offsetFromFooter = 50, // расстояние до низа, при котором срабатывает
    loading = true,
) {
    const lockRef = useRef(false);

    const footerHightRef = useRef<number>(0);

    useEffect(() => {
        if (!loading) {
            const handler = () => {
                if (!footerHightRef.current) {
                    const footerHight =
                        document.querySelector("footer")?.getClientRects()[0].height || 0;
                    console.log(footerHight);
                    if (footerHight) {
                        footerHightRef.current = footerHight;
                    }
                }

                const scrollTop = window.scrollY;
                const viewportHeight = window.innerHeight;
                const fullHeight = document.body.scrollHeight;

                const isAtBottom =
                    scrollTop + viewportHeight >=
                    fullHeight - footerHightRef.current - offsetFromFooter;

                if (isAtBottom && !lockRef.current) {
                    lockRef.current = true;
                    callback();
                }

                if (!isAtBottom) {
                    lockRef.current = false;
                }
            };

            window.addEventListener("scroll", handler, { passive: true });
            return () => window.removeEventListener("scroll", handler);
        }
    }, [callback, offsetFromFooter]);
}
