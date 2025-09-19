var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import range from 'lodash/range';
import { gsap } from 'gsap';
import { radius, center } from './constants';
export var angleToXy = function (angle) {
    return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
    };
};
export var createCircularPath = function (startAngle, endAngle, direction) {
    var steps = 50;
    var directionMulti = direction === 'clockwise' ? 1 : -1;
    var angleRange = (directionMulti * (endAngle - startAngle) + 2 * Math.PI) % (2 * Math.PI);
    var pathPoints = range(0, steps).map(function (i) {
        var progress = i / steps;
        var currentAngle = startAngle + directionMulti * angleRange * progress;
        var _a = angleToXy(currentAngle), x = _a.x, y = _a.y;
        return "".concat(x, ",").concat(y);
    });
    return "M".concat(pathPoints.join(' L'));
};
export var createCircularAnimation = function (params) {
    var element = params.element, startAngle = params.startAngle, endAngle = params.endAngle, direction = params.direction, duration = params.duration, timeline = params.timeline, _a = params.timeOffset, timeOffset = _a === void 0 ? 0 : _a;
    var angleRange = endAngle - startAngle;
    if (direction === 'counterclockwise' && angleRange > 0) {
        angleRange -= 2 * Math.PI;
    }
    else if (direction === 'clockwise' && angleRange < 0) {
        angleRange += 2 * Math.PI;
    }
    var angleObject = { angle: startAngle };
    timeline.to(angleObject, {
        angle: startAngle + angleRange,
        duration: duration,
        onUpdate: function () {
            var _a = angleToXy(angleObject.angle), x = _a.x, y = _a.y;
            gsap.set(element, {
                x: x,
                y: y,
                xPercent: -50,
                yPercent: -50,
            });
        },
    }, timeOffset);
};
export var getPointXyByIndex = function (index, targetIndex, periodsLength) {
    var startAngle = -Math.PI / 3;
    var angleStep = (2 * Math.PI) / periodsLength;
    var adjustedIndex = (index - targetIndex + periodsLength) % periodsLength;
    var angle = startAngle + adjustedIndex * angleStep;
    return __assign(__assign({}, angleToXy(angle)), { angle: angle });
};
