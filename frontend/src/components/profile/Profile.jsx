import React, { useEffect, useState } from "react";
import { Person, Mail } from "@mui/icons-material";
import "./profile.scss";
import {
    thorPortfolio,
    capPortfolio,
    hulkPortfolio,
    ironmanPortfolio
} from '../../data';
import { getCurrentUser } from '../util/APIUtils';
import $, { get } from 'jquery';
import { Link } from "react-router-dom";
import add from "../../assets/add.png";
import axios from 'axios';
import { _url, _urlNuovo, _urlResources } from "../config";


function Profile() {

    const [files, setFiles] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [id, setId] = useState();
    const [models, setModels] = useState([]);
    const [svg, setSvg] = useState([]);
    const [process, setProcess] = useState([]);



    const [selected, setSelected] = useState("thor");
    const [data, setData] = useState([]);

    const list = [
        {
            id: "thor",
            title: "Ventilatore"
        },
        {
            id: "ironman",
            title: "Condizionatore"
        },
        {
            id: "hulk",
            title: "Sensore X"
        },
        {
            id: "cap",
            title: "Sensore Y"
        },
    ]

    useEffect(() => {
        getData();
        // getModels()
        getAllModels();
    }, [])


    useEffect(() => {
        switch (selected) {
            case "thor":
                setData(thorPortfolio);
                break;
            case "ironman":
                setData(ironmanPortfolio);
                break;
            case "hulk":
                setData(hulkPortfolio);
                break;
            case "cap":
                setData(capPortfolio);
                break;
            default:
                setData(thorPortfolio);
        }
    }, [selected])

    function getData() {
        const supp = getCurrentUser()
            .then(response => {
                setName(response.name)
                setEmail(response.email)
                setImage(response.imageUrl)
                setId(response.id)
                getModels(response.id)
                getSvg(response.id);

                //   nome(response.id, response.name)
            }).catch(error => {
                console.log("error", error);
            })
    }

    function getModels(id) {
        id
            ? $.ajax({
                method: "GET",
                url: _url + "/getMyFiles",
                data: { id: id, },
                success: function (data) {
                    setModels(data)
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
                }
            })
            : console.log('nessun id')
    }
    function getSvg(id) {
        id
            ? $.ajax({
                method: "GET",
                url: _url + "/getMySvg",
                data: { id: id, },
                success: function (data) {
                    setSvg(data)
                    console.log("chiamata data",data)
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
                }
            })
            : console.log('nessun id')
    }

    const onInputChange = (e) => {
        setFiles(e.target.files)
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        console.log('files0', files[0]);
        //const imgBlob = new Blob([files[0]], { type: 'xml' });
        //for (let i = 0; i < files.length; i++) {
        data.append('upload', files[0],
            "static/" + id + "/" + files[0].name + ".bpmn");
        //data.append('svg', files[1]);

        //}
        //data.append("id", id);
        data.append("tenant-id", id);

        console.log(data, "data");

        $.ajax({
            method: 'POST',
            url: _urlNuovo + "/rest/deployment/create",
            data: data,
            processData: false,
            contentType: false
        }).done(function (result) {
            // do something with the result now

            console.log(result);
        }).fail(function (a, b, c) {
            alert("error");
        });
    };

    function elimina(d) {
        $.ajax({
            method: "GET",
            url: _url + "/deleteDiagram",
            data: {
                path: d,
                user: id
            },
            success: function (data) {
                window.location.reload()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
            }
        })
    }

    function getAllModels() {
        $.ajax({
            method: "GET",
            url: _urlNuovo + "/rest/process-definition",
            success: function (data) {
                setProcess(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
            }
        })

    }

    function eliminaDaNome(models, name) {
        //console.log("MODELSS", models);
        //console.log("NAME",name);
        name = "static/" + id + "/" + name;
        models.map((d) => {
            if (name === d.resource) {
                $.ajax({
                    method: "DELETE",
                    url: _urlNuovo + "/rest/process-definition/" + d.id,
                    success: function (data) {
                        console.log("data", data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
                    }
                })
                $.ajax({
                    method: "DELETE",
                    url: _urlNuovo + "/rest/deployment/" + d.deploymentId + "?cascade=true",
                    success: function (data) {
                        console.log("data", data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log("funzione chiamata quando la chiamata fallisce", jqXHR, textStatus, errorThrown);
                    }
                })
            }
        }
        );
    }

    return (
        <div className="profile" id="profile">
            <h1>Profile</h1>

            <div className="containerAccount">
                <div className="left">
                    <div className="imgContainer">
                        {image
                            ? <img src={image} alt="" style={{
                                borderRadius: '50%',
                                width: '100%',
                                height: '100%'
                            }} />
                            : null}
                    </div>
                </div>

                <div className="right">
                    <div className="wrapper">
                        <h2>{name}</h2>
                        <h3>{email}</h3>
                    </div>

                    <form method="post" action="#" id="#" onSubmit={onSubmit}>
                        <div className="form-group files" style={{
                            width: '70%',
                        }}>
                            <label>Upload Your File</label>
                            <input type="file"
                                onChange={onInputChange}
                                className="form-control"
                                multiple />

                        </div>
                        {console.log('files0', files.length > 0 ? files[0].name : '')}

                        <button>Submit</button>
                    </form>

                </div>
            </div>

            <div className="containerModels">
                <div className="raw">
                    <h4>Modelli disponibili</h4>
                </div>
                <div className="container" style={{
                    maxHeight: 350,
                    overflow: 'auto',
                }}>
                    {models.map((d, index) => (
                        <div className="containerItem">
                            <Link to={`/bpmn/${d}`}>
                                <div className="item">
                                    {console.log("purchittu",svg[index])}
                                    <img src={svg[index]} alt="" />
                                    <h3>{d}</h3>

                                </div>
                            </Link>
                            <button onClick={() => { elimina(d); eliminaDaNome(process, d); }} className="button">ELIMINA</button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Profile;

