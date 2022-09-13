import "./deployments.scss";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from '../util/APIUtils';
import $ from 'jquery';
import { _urlNuovo, _urlResources } from "../config";

function Deployments() {

  const [id, setId] = useState();
  const [myDeployments, setMyDeployments] = useState([]);
  const [myProcessDefinitions, setMyProcessDefinitions] = useState([]);
  const [listaImmagini, setMyListaImmagini] = useState([]);


  useEffect(() => {
    getId();
    getAllMyProcessDefinitions();
  }, [])


  function getId() {
    const supp = getCurrentUser()
      .then(response => {
        setId(response.id);
        getAllMyDeployments(response.id);
        getAllMyProcessDefinitions(response.id);
        //console.log("response", response.id);
      }).catch(error => {
        console.log("error", error);
      })
  }

  function getAllMyProcessDefinitions(id) {
    $.ajax({
      method: "GET",
      url: _urlNuovo + "/engine-rest/process-definition?tenantIdIn=" + id,
      success: function (data) {
        setMyProcessDefinitions(data);
        console.log("ProcessDefinition", data);
        setMyListaImmagini(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
      }
    })

  }

  function getAllMyDeployments(id) {

    $.ajax({
      method: "GET",
      url: _urlNuovo + "/engine-rest/deployment?tenantIdIn=" + id,
      success: function (data) {
        setMyDeployments(data);
        console.log("deployments", data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
      }
    })

  }


  const [task, setTask] = useState();

  return (
    <div className="deployments" id="deployments">
      <h1>Deployments</h1>

      <div className="container">

        <div className="container2">

          <div className="colonna1" style={{ maxHeight: '100%', overflow: 'auto' }}>
            {
              myDeployments.map((item, index) => {
                return (
                  <button className="item" style={{
                    marginTop: index == 0 ? 10 : 0
                  }}
                    onClick={() => setTask(item)}
                  >
                    <h5>{item.id}</h5>
                    <h5>{item.deploymentTime}</h5>
                    <h5>{item.source}</h5>
                    <h5>{item.tenantId}</h5>
                  </button>
                )
              })
            }
          </div>
          <div className="colonna2">
            {
              task
                ? <div className="item" >
                  <h4>{task.name}</h4>
                  <h5>{task.id}</h5>
                  <h5>{task.deploymentTime}</h5>
                  <h5>{task.source}</h5>
                  <h5>{task.tenantId}</h5>
                </div>
                : null
            }
          </div>
          <div className="colonna3">
            {
              task
                ? <div className="item" >
                  <h4>{task.name}</h4>
                  {
                    listaImmagini.map((item, index) => {
                      return (
                        task.id == item.deploymentId ?
                        <img src={_urlResources+item.resource.toString().substring(6).replace(".bpmn", ".svg")} />
                           : null   
                    )
                  })
                  }
                </div>
                : null
            }
          </div>

        </div>

        <Link to={'/cockpit'} className="link" >
          <button className="cockpitButton" onClick={() => { }}>Cockpit</button>
        </Link>

      </div>
    </div>
  );
}

export default Deployments;

const data = [
  {
    codice: 'xxxxxxxxxx',
    name: 'Paoletto Maldini',
    time: '2022-01-18Txxxx',
    source: 'null',
    tenantId: 1,
    img: 'https://img.ilgcdn.com/sites/default/files/styles/xl/public/foto/2019/12/15/1576423805-2287683.jpg?_=1576773755'
  },
  {
    codice: 'yyyyyyyyyy',
    name: 'Francesco Totti',
    time: '2022-01-18Txxxx',
    source: 'null',
    tenantId: 1,
    img: 'https://tmssl.akamaized.net/images/foto/galerie/francesco-totti-abschied-winken-1601021419-47804.jpg?lm=1601021441'
  },
  {
    codice: 'yyyyyyyyyy',
    name: 'Aereoplanino Montella',
    time: '2022-01-18Txxxx',
    source: 'null',
    tenantId: 1,
    img: 'https://i.pinimg.com/originals/d6/53/cc/d653ccd7ca5143bc31f064cf44b698f4.jpg'
  },
  {
    codice: 'xxxxxxxxxx',
    name: 'Paoletto Maldini',
    time: '2022-01-18Txxxx',
    source: 'null',
    tenantId: 1,
    img: 'https://img.ilgcdn.com/sites/default/files/styles/xl/public/foto/2019/12/15/1576423805-2287683.jpg?_=1576773755'
  },
  {
    codice: 'yyyyyyyyyy',
    name: 'Francesco Totti',
    time: '2022-01-18Txxxx',
    source: 'null',
    tenantId: 1,
    img: 'https://tmssl.akamaized.net/images/foto/galerie/francesco-totti-abschied-winken-1601021419-47804.jpg?lm=1601021441'
  },
  {
    codice: 'yyyyyyyyyy',
    name: 'Aereoplanino Montella',
    time: '2022-01-18Txxxx',
    source: 'null',
    tenantId: 1,
    img: 'https://i.pinimg.com/originals/d6/53/cc/d653ccd7ca5143bc31f064cf44b698f4.jpg'
  },
]
