import range from 'lodash/range';
import { gsap } from 'gsap';

import { radius, center } from './constants';

export const angleToXy = (angle: number) => {
    return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
    };
};

export const createCircularPath = (
    startAngle: number,
    endAngle: number,
    direction: 'clockwise' | 'counterclockwise',
) => {
    const steps = 50;
    const directionMulti = direction === 'clockwise' ? 1 : -1;
    const angleRange = (directionMulti * (endAngle - startAngle) + 2 * Math.PI) % (2 * Math.PI);

    const pathPoints: string[] = range(0, steps).map((i) => {
        const progress = i / steps;
        const currentAngle = startAngle + directionMulti * angleRange * progress;
        const { x, y } = angleToXy(currentAngle);
        return `${x},${y}`;
    });
    return `M${pathPoints.join(' L')}`;
};

export const createCircularAnimation = (
    params: {
        element: Element,
        startAngle: number,
        endAngle: number,
        direction: 'clockwise' | 'counterclockwise',
        duration: number,
        timeline: GSAPTimeline,
        timeOffset?: number,
    },
) => {
    const { element, startAngle, endAngle, direction, duration, timeline, timeOffset = 0 } = params;
    let angleRange = endAngle - startAngle;
    if (direction === 'counterclockwise' && angleRange > 0) {
        angleRange -= 2 * Math.PI;
    } else if (direction === 'clockwise' && angleRange < 0) {
        angleRange += 2 * Math.PI;
    }

    const angleObject = { angle: startAngle };

    timeline.to(angleObject, {
        angle: startAngle + angleRange,
        duration,
        onUpdate() {
            const { x, y } = angleToXy(angleObject.angle);
            gsap.set(element, {
                x,
                y,
                xPercent: -50,
                yPercent: -50,
            });
        },
    }, timeOffset);
};

export const getPointXyByIndex = (index: number, targetIndex: number, periodsLength: number) => {
    const startAngle = -Math.PI / 3;
    const angleStep = (2 * Math.PI) / periodsLength;
    const adjustedIndex = (index - targetIndex + periodsLength) % periodsLength;
    const angle = startAngle + adjustedIndex * angleStep;
    return { ...angleToXy(angle), angle };
};
