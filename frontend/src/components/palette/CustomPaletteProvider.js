import Cat from '../../lib/nyan/cat';
import {
  attr as svgAttr
} from 'tiny-svg';
import BpmnRenderer from 'bpmn-js/lib/draw/BpmnRenderer';


export default class CustomPaletteProvider {
  constructor(palette, elementFactory, create, translate, modeling) {
    this._elementFactory = elementFactory;
    this._create = create;
    this._translate = translate;
    this._modeling = modeling;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const elementFactory = this._elementFactory;
    const create = this._create;
    const translate = this._translate;
    const modeling = this._modeling;

    function createServiceTaskGet(event) {
      const shape = elementFactory.createShape({
        type: "bpmn:ServiceTask"
      });
 
      modeling.setColor(shape, { stroke: 'green', fill: 'white' }); 



      //shape.businessObject["type"] = "external";
      //shape.businessObject["topic"] = "foo";

      shape.businessObject["modelerTemplate"] = "getCallThinger"
      shape.businessObject["topic"] = "getThinger";
      shape.businessObject["type"] = "external";


      //console.log(shape.businessObject);

      create.start(event, shape);
    }

    function createServiceTaskPost(event) {
      const shape = elementFactory.createShape({
        type: "bpmn:ServiceTask"
      });

      modeling.setColor(shape, { stroke: 'red', fill: 'white' });



      //shape.businessObject["type"] = "external";
      //shape.businessObject["topic"] = "foo";

      shape.businessObject["modelerTemplate"] = "postCallThinger"
      shape.businessObject["topic"] = "postThinger";  
      shape.businessObject["type"] = "external";


      //console.log(shape.businessObject);

      create.start(event, shape);
    }

    return {
      "create.service-task-get": {
        group: "activity",

        className: "bpmn-get-service-task",
        imageUrl: "data:image/png;base64,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",
        //imageUrl: "https://i.postimg.cc/90xm54WT/Green-Task.png",
        //imageUrl: "https://i.postimg.cc/tJCRw1Ph/Green-Service-Task33.png",

        title: translate("Create ServiceTask"),

        action: {
          dragstart: createServiceTaskGet,

          click: createServiceTaskGet
        }
      },
      "create.service-task-post": {
        group: "activity",

        className: "bpmn-post-service-task",
        imageUrl: "data:image/png;base64,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",
        //imageUrl: "https://i.postimg.cc/8PrxMy3W/red.png",
        //imageUrl: "https://i.postimg.cc/W4zHWg5G/Green-Service-Task-Red.png",

        title: translate("Create ServiceTask"),

        action: {
          dragstart: createServiceTaskPost,

          click: createServiceTaskPost
        }
      }
    };
  }
}

CustomPaletteProvider.$inject = [
  "palette",
  "elementFactory",
  "create",
  "translate",
  'modeling'
];
