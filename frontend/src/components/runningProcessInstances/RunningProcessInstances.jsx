import "./runningProcessInstances.scss";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function RunningProcessInstances() {

  return (
    <div className="runningProcessInstances" id="runningProcessInstances">
      <h1>Running Process Instances</h1>

      <div className="container">

        <Link to={'/cockpit'} className="link" >
          <button className="cockpitButton" onClick={() => { }}>Cockpit</button>
        </Link>

      </div>
    </div>
  );
}

export default RunningProcessInstances;
