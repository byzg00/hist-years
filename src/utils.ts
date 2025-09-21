const BASE_ANIMATION_DURATION = 0.8;
const MIN_ANIMATION_DURATION = 0.4;

export const calculateAnimationDuration = (
    fromIndex: number,
    toIndex: number,
    totalPeriods: number,
): number => {
    const directDistance = Math.abs(toIndex - fromIndex);
    const wrapAroundDistance = totalPeriods - directDistance;
    const minDistance = Math.min(directDistance, wrapAroundDistance);

    const normalizedDistance = minDistance / (totalPeriods / 2);
    const duration = MIN_ANIMATION_DURATION + (BASE_ANIMATION_DURATION - MIN_ANIMATION_DURATION) * normalizedDistance;

    return Math.max(MIN_ANIMATION_DURATION, duration);
};
