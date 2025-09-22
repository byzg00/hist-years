var BASE_ANIMATION_DURATION = 0.8;
var MIN_ANIMATION_DURATION = 0.4;
export var calculateAnimationDuration = function (fromIndex, toIndex, totalPeriods) {
    var directDistance = Math.abs(toIndex - fromIndex);
    var wrapAroundDistance = totalPeriods - directDistance;
    var minDistance = Math.min(directDistance, wrapAroundDistance);
    var normalizedDistance = minDistance / (totalPeriods / 2);
    var duration = MIN_ANIMATION_DURATION + (BASE_ANIMATION_DURATION - MIN_ANIMATION_DURATION) * normalizedDistance;
    return Math.max(MIN_ANIMATION_DURATION, duration);
};
