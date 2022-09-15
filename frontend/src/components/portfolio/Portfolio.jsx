import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DeviceTable from '../deviceTable/DeviceTable.jsx';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:8080/query', (this.state.value))
      .then(response => {
        console.log(response.data);


      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (

      <div className="bpmn" id="bpmn" >
        <h1>Bpmn Modeler</h1>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h1>
              <label>
                Insert query here:
                <br />
                <textarea value={this.state.value} onChange={this.handleChange} style={{ height: "30vh", width: "60vw" }} />
              </label>
            </h1>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <DeviceTable />

      </div>


    );
  }
}

export default Portfolio;
