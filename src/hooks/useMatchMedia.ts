import { useLayoutEffect, useState } from 'react';

import { mediaQuery } from '../styled';

type MediaQuery = typeof mediaQuery;
export type MediaQueryBreakpoints = MediaQuery[keyof MediaQuery];
export type UseMatchMediaBreakpoint = MediaQueryBreakpoints | `@media (${'min' | 'max'}-width: ${number}px)`;
/*
 * @example
 * const isTablet = useMatchMedia(mediaQuery.lt768);
 */
export function useMatchMedia(breakpoint: UseMatchMediaBreakpoint): boolean {
    const query = breakpoint.replace('@media ', '');
    const [matches, setMatches] = useState(matchMedia(query).matches);

    useLayoutEffect(() => {
        const list = matchMedia(query);

        function handleChange(e: MediaQueryListEvent) {
            setMatches(e.matches);
        }

        function handleResize() {
            const { matches: currentMatches } = matchMedia(query);
            setMatches(currentMatches);
        }

        if (typeof list.addEventListener === 'function') {
            list.addEventListener('change', handleChange);
            return () => list.removeEventListener('change', handleChange);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [query]);

    return matches;
}
