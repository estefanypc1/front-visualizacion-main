import { useState, useEffect } from "react";

export default function useWindowDimensions(ref, pbiEmbed) {

    const hasWindow = typeof window !== "undefined";

    function getWindowDimensions() {
        const DOM = ref.current ? ref.current.getBoundingClientRect() : null;
        const width = hasWindow && DOM ? DOM.width : null;
        const height = hasWindow && DOM ? DOM.height : null;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (pbiEmbed["accessToken"]) {
            setWindowDimensions(getWindowDimensions());
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pbiEmbed])

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasWindow]);

    return windowDimensions;
}