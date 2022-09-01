import "./processDefinitions.scss";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from '../util/APIUtils';
import $ from 'jquery';
import { _urlNuovo, _urlResources } from "../config";


function ProcessDefinitions(processDefinitions) {
  const [myProcessDefinitions, setMyProcessDefinitions] = useState([]);
  const [id, setId] = useState();
  const [myIncidents, setMyIncidents] = useState();
  const [myInstances, setMyInstances] = useState([]);



  useEffect(() => {
    getId();

  }, [])


  function getId() {
    const supp = getCurrentUser()
      .then(response => {
        setId(response.id);
        getAllMyProcessDefinitions(response.id);
        //getAllMyIncidents(response.id);

        //console.log("response", response.id);
      }).catch(error => {
        console.log("error", error);
      })
  }


  function getAllMyProcessDefinitions(id) {
    $.ajax({
      method: "GET",
      url: _urlNuovo + "/rest/process-definition?tenantIdIn=" + id,
      success: function (data) {
        setMyProcessDefinitions(data);
        console.log("data", data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
      }
    })

  }

/*   function getAllMyIncidents(id, processDefinitionId) {

    $.ajax({
      method: "GET",
      url: _urlNuovo + "/rest/incident/count?tenantIdIn=" + id + "&processDefinitionId=" + processDefinitionId,
      success: function (data) {
        setMyIncidents(data.count);
        console.log("incidents: ", data.count);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
      }
    })

  }

  function getAllMyInstances(id, processDefinitionId) {

    $.ajax({
      method: "GET",
      url: _urlNuovo + "/rest/process-instance?tenantIdIn=" + id + "&processDefinitionId=" + processDefinitionId,
      success: function (data) {
        setMyInstances(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
      }
    })

  } */

  return (
    <div className="processDefinitions" id="processDefinitions">
      <h1>Process Definitions</h1>
      <div className="container">
        <div className="tabella">

          <div className="header">
            <div className="cella">
              <h4>State</h4>
            </div>
            <div className="cella">
              <h4>Deployment ID</h4>
            </div>
            <div className="cella">
              <h4>Key</h4>
            </div>
            <div className="cella">
              <h4>Process ID</h4>
            </div>
            <div className="cella">
              <h4>Preview</h4>
            </div>
          </div>

          <div className="containerLista">
            <div className="lista" style={{ maxHeight: 550, overflow: 'auto' }}>
              {
                myProcessDefinitions.map((item, index) => {
                  return <div className="item">
                    <div className="cellina">
                      {
                        item.suspended == false
                          ? <img className="image" src="https://www.freeiconspng.com/uploads/check-mark-icon-green-0.png" />
                          : <img className="image" src="https://cdn2.iconfinder.com/data/icons/web-and-apps-interface/32/Cancel-512.png" />
                      }
                    </div>
                    <div className="cellina">
                      {item.deploymentId}
                    </div>
                    <div className="cellina">
                      {item.key}
                    </div>
                    <div className="cellina">
                      {item.id}
                    </div>
                    <div className="cellina">
                      <img src={_urlResources+item.resource.toString().substring(6).replace(".bpmn", ".svg")} />
                    </div>
                  </div>
                })
              }
            </div>
          </div>

        </div>

        <Link to={'/cockpit'} className="link" >
          <button className="cockpitButton" onClick={() => { }}>Cockpit</button>
        </Link>

      </div>
    </div>
  );
}

export default ProcessDefinitions;

/* const data = [
  {
    key: 0,
    state: true,
    incidents: 0,
    running: 2,
    name: 'Victor',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 1,
    state: false,
    incidents: 0,
    running: 2,
    name: 'Cippy',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 2,
    state: true,
    incidents: 0,
    running: 2,
    name: '8======D',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 3,
    state: true,
    incidents: 0,
    running: 2,
    name: ':)',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 1,
    state: false,
    incidents: 0,
    running: 2,
    name: 'Cippy',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 2,
    state: true,
    incidents: 0,
    running: 2,
    name: '8======D',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 3,
    state: true,
    incidents: 0,
    running: 2,
    name: ':)',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 0,
    state: true,
    incidents: 0,
    running: 2,
    name: 'Victor',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 1,
    state: true,
    incidents: 0,
    running: 2,
    name: 'Cippy',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 2,
    state: true,
    incidents: 0,
    running: 2,
    name: '8======D',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 3,
    state: true,
    incidents: 0,
    running: 2,
    name: ':)',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 1,
    state: true,
    incidents: 0,
    running: 2,
    name: 'Cippy',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 2,
    state: true,
    incidents: 0,
    running: 2,
    name: '8======D',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
  {
    key: 3,
    state: true,
    incidents: 0,
    running: 2,
    name: ':)',
    preview: 'https://www.avvenire.it/c/2021/PublishingImages/d8a65de3c03a4ab09d3f38ff31e4d36c/NONE_SOCCE_77850025.jpg?width=1024'
  },
]
 */