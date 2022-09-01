import "./bpmn.scss";
import BpmnModelerComponent from "./bpmn.modeler.component";
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { getCurrentUser } from '../util/APIUtils';
import { _url, _urlResources } from "../config";


function Bpmn(props) {
  let location = useLocation();
  let bpmn = location.pathname.substring(6);
  const [data, setData] = useState();

  //const XMLData = `http://localhost:8081/${id}/${bpmn}`;

  const [bpmnString, setBpmnString] = useState("");

  function getData() {
    const supp = getCurrentUser()
      .then(response => {
        getCall(`${_urlResources}/${response.id}/${bpmn}`)
        setData(`${_urlResources}/${response.id}/${bpmn}`)
      }).catch(error => {
        console.log("error", error);
      })
  }

  useEffect(() => {
    // getModels()
    getData();

  }, [])

  function getCall(url) {
    axios.get(url, {
      "Content-Type": "application/xml; charset=utf-8"
    })
      .then((response) => {
        // console.log('Your xml file as string', response.data);
        setBpmnString(response.data)
      })
      .catch((error) => console.log(error))
  }

  if (bpmnString == "") {
    return null
  }
  else
    return (
      <div className="bpmn" id="bpmn">
        <h1>Bpmn Modeler</h1>
        <div className="container">
          <BpmnModelerComponent xml={data} bpmnString={bpmnString} />
        </div>
      </div>
    );
}

export default Bpmn;
