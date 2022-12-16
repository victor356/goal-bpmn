import TopBar from "./components/topbar/TopBar";
import Intro from "./components/intro/Intro";
//import Portfolio from "./components/portfolio/Portfolio";
import Portfolio from "./components/portfolio/Portfolio";
import Bpmn from "./components/bpmn/Bpmn";
import Works from "./components/works/Works";
import "./App.scss";
import React, { useEffect, useState } from "react";
import Menu from "./components/menu/Menu";
//import Login from "./components/login/Login";
//import Profile from "./components/profile/Profile";
//import useToken from './components/useToken';
import BpmnModeler from './components/bpmn/BpmnModeler';
//import Cockpit from './components/cockpit/Cockpit';
import ProcessDefinitions from './components/processDefinition/ProcessDefinitions';
import Deployments from './components/deployments/Deployments';
import RunningProcessInstances from './components/runningProcessInstances/RunningProcessInstances';
import axios from 'axios';

import $ from 'jquery';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { _url, _urlNuovo } from "./components/config";
import { getCurrentUser } from './components/util/APIUtils';

function App() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [tokenBool, setTokenBool] = useState(false);

 //const { token, setToken } = useToken();

  // useEffect(() => {
  //   $.ajax({
  //     method: "GET",
  //     url: _url + "/tokenValid",
  //     data: { token: localStorage.getItem("accessToken"), },
  //     success: function (data) {
  //       //console.log('data', data)
  //       setTokenBool(data)
  //     },
  //     error: function (jqXHR, textStatus, errorThrown) {
  //       console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
  //       setTokenBool(false)
  //     }
  //   });
  //  // getData();

  // }, [])

  useEffect(() => {
  }, [])



  function getData() {
    const supp = getCurrentUser()
      .then(response => {
       // setTenant(response.id, response.name)
        console.log("RISPOSTA:", response.id + response.name)
      }).catch(error => {
        console.log("error", error);
      })
  }

  // if (!localStorage.getItem("accessToken")) {
  //   return <div className="login">
  //     <Login setToken={setToken} />
  //   </div>
  // }

  // if (setTokenBool === false) {
  //   localStorage.removeItem('accessToken')
  // }

  // function setTenant(id, nome) {
  //   console.log(id + nome);
  //   const recipeUrl = _urlNuovo + "/engine-rest/tenant/create";
  //   const postBody = {
  //     id: `${id}`,
  //     name: `${nome}`
  //   };
  //   console.log("postBody", postBody);
  //   const requestMetadata = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(postBody)
  //   };

  //   fetch(recipeUrl, requestMetadata)
  //     .then(res => res.json())
  //     .then(recipes => {
  //       // this.setState({ recipes });
  //       console.log(recipes);
  //     });
  //   setMembership(id);
  // }


  // function setMembership(id) {
  //   const recipeUrl = _urlNuovo + "/engine-rest/tenant/" + id + "/user-members/vittoriorinaldi";

  //   const requestMetadata = {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //   };

    // fetch(recipeUrl, requestMetadata)
    //   .then(res => res.json())
    //   .then(recipes => {
    //     // this.setState({ recipes });
    //     console.log(recipes);
    //   });
  //}
  // console.log('token', localStorage.getItem("accessToken"))

  /* return (
    <div className="app">
      <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="sections">
        <Intro />
        <Profile />
        <Portfolio />
        <Works />
        <Bpmn />
      </div>
 
    </div>
  ); */

  return (
    <Router>
      <div className="app">
        <TopBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <div className="sections">
          <Routes>
            <Route path="/" element={<Intro />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            {/* <Route path="/portfolio" element={<Portfolio />} /> */}
            {/* <Route path="/works" element={<Works />} /> */}
            {/* <Route path="/bpmn/:d" element={<Bpmn />} /> */}
            <Route path="/bpmnModeler" element={<BpmnModeler />} />
            {/* <Route path="/cockpit" element={<Cockpit />} /> */}
            <Route path="/processDefinitions" element={<ProcessDefinitions />} />
            <Route path="/deployments" element={<Deployments />} />
            <Route path="/runningProcessInstances" element={<RunningProcessInstances />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
