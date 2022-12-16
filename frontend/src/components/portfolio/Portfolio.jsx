import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DeviceTable from '../deviceTable/DeviceTable.jsx';
import "./portfolio.scss";



class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', head: [], rows: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  

  componentDidMount() {
    // Runs after the first render() lifecycle
    axios.get("http://localhost:8080/getResults")
    .then(res => {
       
        this.setState({head: res.data.head.vars})
     //   console.log("get columns",res.data.head.vars)
        
        this.setState({rows: res.data.results.bindings})
     //   console.log("get rows",res.data.results.bindings)
        
      })
    }
    



  handleChange(event) {
    this.setState({ value: event.target.value });
  }

 

  handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:8080/query', (this.state.value))
      .then(response => {
        console.log("inviato goal" ,response.data);

        axios.get("http://localhost:8080/getResults")
      .then(res => {
         
          this.setState({head: res.data.head.vars})
       //   console.log("get columns",res.data.head.vars)
          
          this.setState({rows: res.data.results.bindings})
       //   console.log("get rows",res.data.results.bindings)
          
        })
      })
      .catch(error => {
        console.log(error)
      })

      
  }

  render() {
    console.log("risultato head", this.state.head);
    console.log("risultato row", this.state.rows);

    return (

      <div className="portfolio" >

        <form onSubmit={this.handleSubmit} style={{ alignItems: "center", alignContent: "center", display: "contents" }}>
          <h1>
            <label>
              Insert goal/task here:
              <br />
            
              <input type="text" alignContent="center" value={this.state.value} onChange={this.handleChange} style={{
                borderWidth: 1,
                borderColor: "thistle",
                borderRadius: 50,
                width: "100%",
                height: "3vh",
                justifyContent: "center",
                textAlign:"center"

              }}  />
                          </label>
          </h1>
          <input type="submit" value="Submit" />
        </form>
         <DeviceTable head={this.state.head} rows={this.state.rows}  /> 

      </div>


    );
  }
}

export default Portfolio;
