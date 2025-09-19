import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
export var useHoverCheck = function (params) {
    var containerRef = params.containerRef, interactionRefs = params.interactionRefs, periods = params.periods, activePeriodId = params.activePeriodId, handleMouseEnter = params.handleMouseEnter;
    var contextSafe = useGSAP({ scope: containerRef }).contextSafe;
    var clickPositionRef = useRef(null);
    var checkHoverViaCSS = contextSafe(function () {
        var _a;
        if (!clickPositionRef.current || !containerRef.current)
            return;
        var elementsUnderClick = document.elementsFromPoint(clickPositionRef.current.x, clickPositionRef.current.y);
        var interactionElement = elementsUnderClick.find(function (element) {
            return element.hasAttribute && element.hasAttribute('data-interaction-point');
        });
        if (interactionElement) {
            var computedStyle = getComputedStyle(interactionElement);
            var isHovered = computedStyle.getPropertyValue('--is-hovered').trim();
            if (isHovered === '1') {
                var index = interactionRefs.current.findIndex(function (ref) { return ref === interactionElement; });
                if (index !== -1 && ((_a = periods[index]) === null || _a === void 0 ? void 0 : _a.id) !== activePeriodId) {
                    handleMouseEnter(index);
                }
            }
        }
    });
    var saveClickPosition = function (e) {
        clickPositionRef.current = { x: e.clientX, y: e.clientY };
    };
    return {
        checkHoverViaCSS: checkHoverViaCSS,
        saveClickPosition: saveClickPosition,
    };
};
