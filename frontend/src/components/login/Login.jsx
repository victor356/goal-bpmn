import "./login.scss";
import React, { useState } from "react";
import loginImg from "../../assets/login.svg"
import google from "../../assets/google.png"
import { getCurrentUser } from '../util/APIUtils';
import { _url, _urlNuovo } from "../config";


function Login({ setToken }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    function getToken1() {
        setToken(window.location.href.substring(29))
    }
  
    return (
        <div className="base-container" id="login">
            <div className="header">
                Entra nel portale
            </div>

            <div className="content">
                <div className="image">
                    <img src={loginImg} />
                </div>
                <div className="form">
                    <div className="form-group">
                        <h1>IoT-Aware Bpmn</h1>
                    </div>
                    <div className="form-group">
                        <h4>From idea to reality 💡</h4>
                    </div>

                    {/* <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div> */}
                </div>
            </div>

            <div className="footer">
                {/*  <button type="button" className="btn" onClick={() => {
                    console.log('email: ', email, '| password: ', password)
                    setToken('test123')
                    setEmail("");
                    setPassword("");
                }}> 
                    Login
                </button>*/}
                <a className="btn btn-block social-btn google prova" href={_url + "/oauth2/authorize/google?redirect_uri=http://localhost:3000/"}
                /* onClick={() => {
                    validToken()
                }} */
                >
                    {getToken1()}
                    <img src={google} style={{
                        width: 50,
                        height: 50,
                        paddingRight: 10
                    }} />
                    Accedi con Google
                </a>
            </div>
        </div >
    );
}

export default Login;
