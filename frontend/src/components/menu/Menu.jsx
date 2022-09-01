import "./menu.scss";
import React from "react";
import useToken from "../useToken"
import { Link } from "react-router-dom";

function Menu({ menuOpen, setMenuOpen }) {

    return (
        <div className={"menu " + (menuOpen && "active")}>
            <ul className={"menulist"}>

                <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
                    <li onClick={() => setMenuOpen(false)}>Home</li>
                </Link>
                <Link to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>
                    <li onClick={() => setMenuOpen(false)}>Profile</li>
                </Link>
                <Link to="/portfolio" style={{ color: '#fff', textDecoration: 'none' }}>
                    <li onClick={() => setMenuOpen(false)}>IoT Devices</li>
                </Link>
                <Link to="/works" style={{ color: '#fff', textDecoration: 'none' }}>
                    <li onClick={() => setMenuOpen(false)}>Technologies</li>
                </Link>
                <Link to="/bpmnModeler" style={{ color: '#fff', textDecoration: 'none' }}>
                    <li onClick={() => setMenuOpen(false)}>Bpmn Modeler</li>
                </Link>
                <Link to="/cockpit" style={{ color: '#fff', textDecoration: 'none' }}>
                    <li onClick={() => setMenuOpen(false)}>Cockpit</li>
                </Link>
                <div className='logout'>
                <Link to="/login"  style={{ color: '#fff', textDecoration: 'none' }}>
                    <li style={{
                        color: 'crimson',
                    }} onClick={() => {
                        setMenuOpen(false);
                        localStorage.removeItem('accessToken');
                    }}>
                        Logout
                    </li>
                </Link>
                </div>
            </ul>
        </div>
    );
}

export default Menu;
