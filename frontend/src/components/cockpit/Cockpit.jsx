import "./cockpit.scss";
import React, { useEffect, useRef, useState } from "react";
import $ from 'jquery';
import { getCurrentUser } from '../util/APIUtils';
import { Link } from "react-router-dom";
import {_urlNuovo} from "../config";
import ProcessDefinitions from "../processDefinition/ProcessDefinitions";

function Cockpit() {

  const [id, setId] = useState();
  const [myProcessDefinitions, setMyProcessDefinitions] = useState([]);
  const [myDeployments, setMyDeployments] = useState([]);
  const [myInstances, setMyInstances] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [myIncidents, setMyIncidents] = useState([]);
  const [myDecisions, setMyDecisions] = useState([]);
  const [myCases, setMyCases] = useState([]);



  useEffect(() => {
    getId();
    //getAllMyProcessDefinitions();

  }, [])



  function getId() {
    const supp = getCurrentUser()
      .then(response => {
        setId(response.id);
        getAllMyProcessDefinitions(response.id);
        getAllMyDeployments(response.id);
        getAllMyInstances(response.id);
        getAllMyTasks(response.id);
        getAllMyIncidents(response.id);
        getAllMyDecisions(response.id);
        getAllMyCases(response.id);
        //console.log("response", response.id);
      }).catch(error => {
        console.log("error", error);
      })
  }


  function getAllMyProcessDefinitions(id) {
    $.ajax({
      method: "GET",
      url: _urlNuovo  + "/rest/process-definition?tenantIdIn=" + id,
      success: function (data) {
        setMyProcessDefinitions(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
      }
    })

  }

  function getAllMyDeployments(id) {

    $.ajax({
      method: "GET",
      url: _urlNuovo  + "/rest/deployment?tenantIdIn=" + id,
      success: function (data) {
        setMyDeployments(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
      }
    })

  }

  function getAllMyInstances(id) {

    $.ajax({
      method: "GET",
      url: _urlNuovo  + "/rest/process-instance?tenantIdIn=" + id,
      success: function (data) {
        setMyInstances(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
      }
    })

  }

  function getAllMyTasks(id) {

    $.ajax({
      method: "GET",
      url: _urlNuovo  + "/rest/task?tenantIdIn=" + id,
      success: function (data) {
        setMyTasks(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
      }
    })

  }

  function getAllMyIncidents(id) {

    $.ajax({
      method: "GET",
      url: _urlNuovo  + "/rest/incident?tenantIdIn=" + id,
      success: function (data) {
        setMyIncidents(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
      }
    })

  }

  function getAllMyDecisions(id) {

    $.ajax({
      method: "GET",
      url: _urlNuovo  + "/rest/decision-definition?tenantIdIn=" + id,
      success: function (data) {
        setMyDecisions(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
      }
    })

  }

  function getAllMyCases(id) {

    $.ajax({
      method: "GET",
      url: _urlNuovo  + "/rest/case-definition?tenantIdIn=" + id,
      success: function (data) {
        setMyCases(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
      }
    })

  }


  return (
    <div className="cockpit" id="cockpit">
      <h1>Cockpit</h1>

      <div className="container">

        <div className="item1">
          <div className="titolo">
            <h2>Right now</h2>
          </div>
          <div className="content">
            <div className="item">

{/*               <Link to={'/runningProcessInstances'} className="circle">
 */}                <div className="circle">
                  <h4>Running Process Instances</h4>
                  <h1>{myInstances.length}</h1>
                </div>
{/*               </Link>
 */}
            </div>
            <div className="item">
              <div className="circle">
                <h4>Open Incidents</h4>
                <h1>{myIncidents.length}</h1>
              </div>
            </div>
            <div className="item">
              <div className="circle">
                <h4>Open Human Tasks</h4>
                <h1>{myTasks.length}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="item2">
          <div className="titolo">
            <h2>Deployed</h2>
          </div>
          <div className="content">
            <div className="item">
              <Link to={'/processDefinitions'} className="itemButton" >
                <h4>Process Definitions</h4>
                <h1>{myProcessDefinitions.length}</h1>
              </Link>
            </div>
            <div className="item">
              <h4>Decision Definitions</h4>
              <h1>{myDecisions.length}</h1>
            </div>
            <div className="item">
              <h4>Case Definitions</h4>
              <h1>{myCases.length}</h1>
            </div>
            <div className="item">
              <Link to={'/deployments'} className="itemButton" >
                <h4>Deployments</h4>
                <h1>{myDeployments.length}</h1>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cockpit;
