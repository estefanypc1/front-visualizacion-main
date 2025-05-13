import { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

const getDeviceConfig = (width) => {
    if (width < 600) {
        return 'xs';
    } else if (width >= 600 && width < 900) {
        return 'sm';
    } else if (width >= 900 && width < 1200) {
        return 'md';
    } else if (width >= 1200) {
        return 'lg';
    }
};

const useBreakpoints = () => {
    const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(window.innerWidth));

    useEffect(() => {
        const calcInnerWidth = throttle(function () {
            setBrkPnt(getDeviceConfig(window.innerWidth))
        }, 200);
        window.addEventListener('resize', calcInnerWidth);
        return () => window.removeEventListener('resize', calcInnerWidth);
    }, []);

    return brkPnt;
}
export default useBreakpoints;