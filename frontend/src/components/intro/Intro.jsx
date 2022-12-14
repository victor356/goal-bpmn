import "./intro.scss";
import { init } from 'ityped'
import React, { useEffect, useRef } from "react";
import Zoom from 'react-reveal/Zoom';
import image from "../../assets/foto.png";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Intro() {

  const textRef = useRef();

  useEffect(() => {
    init(textRef.current, {
      showCursor: true,
      backDelay: 1500,
      backSpeed: 60,
      strings: ['design a model',  'get your devices', 'know your tasks', 'consult your knowledge base']
    })
  }, [])

  return (
    <div className="intro" id="intro">
      <div className="left">
        <Zoom top>
          <div className="imgContainer">
            <img src={image}
              alt="" />
          </div>
        </Zoom>
      </div>

      <div className="right">
        <div className="wrapper">
          <h1>Goal oriented BPMN modeling</h1>
          <h3>Allows to <span ref={textRef}></span></h3>
          
          <Link to="/bpmnModeler" >
            <button className="buttonToModel">Create a model</button>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Intro;
