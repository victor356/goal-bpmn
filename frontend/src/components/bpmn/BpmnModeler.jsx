import "./bpmn.scss";
import BpmnModelerComponent from "./bpmn.modeler.component";
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import {Link, useLocation} from "react-router-dom";
import Portfolio from '../portfolio/Portfolio.jsx';


function BpmnModeler() {

  return (
    <div className="bpmn" id="bpmnModeler">
      <h1>BPMN Modeler</h1>
      <div className="container">
        <BpmnModelerComponent />
        <Portfolio/>
      </div>
    </div>
  );
}

export default BpmnModeler;
