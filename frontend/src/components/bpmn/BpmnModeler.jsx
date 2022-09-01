import "./bpmn.scss";
import BpmnModelerComponent from "./bpmn.modeler.component";
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import {Link, useLocation} from "react-router-dom";

function BpmnModeler() {

  return (
    <div className="bpmn" id="bpmnModeler">
      <h1>Bpmn Modeler</h1>
      <div className="container">
        <BpmnModelerComponent />
      </div>
    </div>
  );
}

export default BpmnModeler;
