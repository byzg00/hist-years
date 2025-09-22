import { useLayoutEffect, useState } from 'react';
export function useMatchMedia(breakpoint) {
    var query = breakpoint.replace('@media ', '');
    var _a = useState(matchMedia(query).matches), matches = _a[0], setMatches = _a[1];
    useLayoutEffect(function () {
        var list = matchMedia(query);
        function handleChange(e) {
            setMatches(e.matches);
        }
        function handleResize() {
            var currentMatches = matchMedia(query).matches;
            setMatches(currentMatches);
        }
        if (typeof list.addEventListener === 'function') {
            list.addEventListener('change', handleChange);
            return function () { return list.removeEventListener('change', handleChange); };
        }
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, [query]);
    return matches;
}
