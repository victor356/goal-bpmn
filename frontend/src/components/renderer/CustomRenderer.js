import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
    append as svgAppend,
    attr as svgAttr,
    create as svgCreate,
    remove as svgRemove
} from 'tiny-svg';

import {
    getRoundRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import { is } from 'bpmn-js/lib/util/ModelUtil';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import * as d3 from "d3";

const HIGH_PRIORITY = 1500,
    TASK_BORDER_RADIUS = 10;


export default class CustomRenderer extends BaseRenderer {
    constructor(eventBus, bpmnRenderer) {
        super(eventBus, HIGH_PRIORITY);

        this.bpmnRenderer = bpmnRenderer;
    }

    canRender(element) {

        // only render tasks and events (ignore labels)
        return isAny(element, ['bpmn:ServiceTask', 'bpmn:Event']) && !element.labelTarget;
    }

    drawShape(parentNode, element) {
        const shape = this.bpmnRenderer.drawShape(parentNode, element);
        //const icon = this.bpmnRenderer.getPath();
        //console.log('shape', this.bpmnRenderer);
        if (is(element, 'bpmn:ServiceTask') && (element.businessObject.modelerTemplate == 'getCallThinger' || element.businessObject.modelerTemplate == 'gethttp' || element.businessObject.modelerTemplate == 'getmqtt' )) {
            //console.log('element',element.businessObject.modelerTemplate)
            //const rect = drawRect(parentNode, 100, 80, TASK_BORDER_RADIUS, '#52B415');

            var div = document.createElement('div');
            // assing your HTML to div's innerHTML
            div.innerHTML = parentNode;
            console.log("div", div.innerHTML);
            console.log("paren", parentNode);

            div.innerHTML = d3.selectAll("path").remove();
            //proporzione 0,58
            var catGfx = svgCreate('image', {
                x: 2,
                y: 2,
                width: 35,
                height: 20.3,
                //href: "https://i.postimg.cc/MTXJ9kdZ/icono.png"
                href:"data:image/png;base64,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"
            });
            const rect = drawRect(parentNode, 100, 80, TASK_BORDER_RADIUS, '#52B415');
            svgAppend(parentNode, catGfx);

            return catGfx;
            //prependTo(rect, parentNode);


            //return shape;
        }

        if (is(element, 'bpmn:ServiceTask') &&  (element.businessObject.modelerTemplate == 'postCallThinger' || element.businessObject.modelerTemplate == 'posthttp' || element.businessObject.modelerTemplate == 'postmqtt' )) {
            //console.log('element',element.businessObject.modelerTemplate)
            //const rect = drawRect(parentNode, 100, 80, TASK_BORDER_RADIUS, '#52B415');

            var div = document.createElement('div');
            // assing your HTML to div's innerHTML
            div.innerHTML = parentNode;
            console.log("div", div.innerHTML);
            console.log("paren", parentNode);

            div.innerHTML = d3.selectAll("path").remove();
      
            var catGfx = svgCreate('image', {
                x: 2,
                y: 2,
                width: 35,
                height: 20.3,
                //href: "https://i.postimg.cc/R0SQRFPf/iconRed.png"
                href:"data:image/png;base64,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"
            });
            const rect = drawRect(parentNode, 100, 80, TASK_BORDER_RADIUS, 'red');
            svgAppend(parentNode, catGfx);

            return catGfx;
            //prependTo(rect, parentNode);


            //return shape;
        }

        //const rect = drawRect(parentNode, 30, 20, TASK_BORDER_RADIUS, '#cc0000');

        /* svgAttr(rect, {
          transform: 'translate(-20, -10)'
        }); */

        return shape;
    }

    /*   getShapePath(shape) {
        if (is(shape, 'bpmn:Task')) {
          return getRoundRectPath(shape, TASK_BORDER_RADIUS);
        }
    
        return this.bpmnRenderer.getShapePath(shape);
      } */
}

CustomRenderer.$inject = ['eventBus', 'bpmnRenderer'];

// helpers //////////

// copied from https://github.com/bpmn-io/bpmn-js/blob/master/lib/draw/BpmnRenderer.js
function drawRect(parentNode, width, height, borderRadius, strokeColor) {
    const rect = svgCreate('rect');

    svgAttr(rect, {
        width: width,
        height: height,
        rx: borderRadius,
        ry: borderRadius,
        stroke: strokeColor || '#000',
        strokeWidth: 2,
        fill: 'rgba(0, 0, 0, 0)'
    });

    svgAppend(parentNode, rect);

    return rect;
}

// copied from https://github.com/bpmn-io/diagram-js/blob/master/lib/core/GraphicsFactory.js
function prependTo(newNode, parentNode, siblingNode) {
    parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
}