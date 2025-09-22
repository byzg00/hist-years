import { useMatchMedia } from '../../hooks/useMatchMedia';
import { mediaQuery } from '../../styled';

export const Chevron = (props: { className?: string }) => {
    const { className } = props;
    const isMobile = useMatchMedia(mediaQuery.lt480);
    return isMobile ? (
        <svg className={className} width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.7489 1.04178L1.6239 4.16678L4.7489 7.29178" stroke="currentColor" strokeWidth="2" />
        </svg>
    ) : (
        <svg className={className} width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.49988 0.750001L2.24988 7L8.49988 13.25" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
};
