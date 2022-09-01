import React, { Component } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import { emptyBpmn } from '../../assets/empty.bpmn';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import "./bpmn.scss";
import { is } from 'bpmn-js/lib/util/ModelUtil';
import { ExternalLink } from 'react-external-link';
import { getCurrentUser } from '../util/APIUtils';
import $ from 'jquery';

// prova gatto
import resizeAllModule from '../../lib/resize-all-rules';
import colorPickerModule from '../../lib/color-picker';
import nyanDrawModule from '../../lib/nyan/draw';
import nyanPaletteModule from '../../lib/nyan/palette';
import templates from '../bpmn/element-templates/data.json';

import PropertiesPanelModule from "bpmn-js-properties-panel";
import CamundaPropertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import CustomPaletteProvider from "../palette";
import CamundaModdlePackage from "camunda-bpmn-moddle/resources/camunda";
import CamundaModdleExtension from "camunda-bpmn-moddle/lib";
import CustomRendererModule from '../renderer';
import { _url, _urlNuovo } from '../config';
import { Link } from 'react-router-dom';
import { saveAs } from "file-saver";

class BpmnModelerComponent extends Component {

    modeler = null;
    listaNomi = [];

    constructor(props) {
        super(props);
        this.state = { currentUser: null, bpmn: props.xml, bpmnString: props.bpmnString }
        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                });
            }).catch(error => {
                console.log("error", error);
            });
    }

    componentDidMount = () => {
        this.modeler = new BpmnModeler({
            container: '#bpmnview',
            keyboard: {
                bindTo: window
            },
            propertiesPanel: {
                parent: '#propview'
            },
            additionalModules: [
                propertiesPanelModule,
                propertiesProviderModule,
                // templates,

                // gatto
                //resizeAllModule,
                //colorPickerModule,
                //nyanDrawModule,
                //nyanPaletteModule,

                CamundaPropertiesProviderModule,
                CamundaModdleExtension,
                CustomPaletteProvider,
                CustomRendererModule
            ],
            elementTemplates: templates,
            moddleExtensions: {
                camunda: camundaModdleDescriptor,
                camunda: CamundaModdlePackage

            },



        });

        this.newBpmnDiagram();
        this.loadCurrentlyLoggedInUser();

    }

    newBpmnDiagram = () => {
        this.state.bpmn
            ? this.openBpmnDiagram(this.state.bpmnString)
            : this.openBpmnDiagram(emptyBpmn)

        console.log("this.state.bpmnString", this.state);

    }

    openBpmnDiagram = (xml) => {
        this.modeler.importXML(xml, (error) => {
            if (error) {
                return console.log('fail import xml');
            }

            var canvas = this.modeler.get('canvas');

            canvas.zoom('fit-viewport');
        });
    }

    saveDiagram = (done) => {

        this.modeler.saveXML({ format: true }, function (err, xml) {
            done(err, xml);
        });
    }
    Validate = (props) => {
        const name = this.getParameter();
        console.log('name', name);
        const formData = new FormData();
        const formData1 = new FormData();
        const img = this.getImage();
        this.saveDiagram(function (err, xml) {
            const imgBlob = new Blob([xml], { type: 'xml' });
            formData.append(
                "upload",
                imgBlob,
                name + ".bpmn"
            );
            formData1.append(
                "upload",
                imgBlob,
                "static/" + props.id + "/" + name + ".bpmn"
            )
           formData1.append("tenant-id", props.id);
            $.ajax({
                method: 'POST',
                url: _urlNuovo + "/rest/deployment/create",
                data: formData1,
                processData: false,
                contentType: false
            }).done(function (result) {
                // do something with the result now

                console.log(result);
            }).fail(function (a, b, c) {
                alert("error");
            });
           
            formData.append("id", props.id);
            formData.append("svg", img, name + ".svg");
            $.ajax({
                method: 'POST',
                url: _url + "/upload",
                data: formData,
                processData: false,
                contentType: false
            }).done(function (result) {
                // do something with the result now

                console.log(result);
            }).fail(function (a, b, c) {
                alert("error");
            });
        });

    }

    Download = () => {
        const name = this.getParameter()
        this.modeler.saveXML({ format: true }, function (err, xml) {
            if (err) {
                console.error(err);
            } else {
                var encodedData = err ? '' : encodeURIComponent(xml);
                saveAs(
                    'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
                    name + ".bpmn"
                  );
            }
        });
    }

    getImage = () => {
        var blob;
        this.modeler.saveSVG({ format: true }, function (err, svg) {
            if (err) {
                return;
            }

            var svgBlob = new Blob([svg], {
                type: 'image/svg+xml'
            });
            blob = svgBlob;

        })
        return blob;
    }

    getParameter = () => {

        const canvas = this.modeler.get('canvas');

        const rootElement = canvas.getRootElement();

        console.log('Process Id:', rootElement.id);
        rootElement.businessObject.participants.map((item, index) => {
            this.listaNomi[index] = item.processRef.id
            // return console.log('item', this.listaNomi[index]);
        })
        //const formData = new FormData();
        //formData.append('nameList', this.listaNomi);
        //var xhr = new XMLHttpRequest();
        //xhr.open('POST', 'http://localhost:8081/uploadNames');
        //xhr.onload = function (e) {
        //    console.log("xhr onload function");
        //};
        //xhr.send(formData);
        return rootElement.id;
    }

    render = () => {
        return (
            <div id="bpmncontainer" style={{ width: '100%', height: '100%' }} >
                <div id="propview" style={{ width: '25%', height: '100%', float: 'right', maxHeight: '100%', overflowX: 'auto' }}></div>
                <div id="bpmnview" style={{ width: '75%', height: '100%', float: 'left' }}></div>
                <div className="modelerBPMN">
                    <button className="downloadButton" onClick={() => { this.Validate(this.state.currentUser) }}>Save</button>
                    <ExternalLink href={_urlNuovo} className="link"><button className="validateButton" onClick={() => { this.Validate(this.state.currentUser) }}>Deploy</button></ExternalLink>
                    <button className="downloadButton" onClick={() => { this.Download() }}>Download</button>
                    <Link to="/cockpit" className="link" >
                        <button className="validateButton" onClick={() => { }}>Cockpit</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default BpmnModelerComponent;
