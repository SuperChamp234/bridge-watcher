import * as React from "react";
import Database from "./components/Database";
import bridgeData from "./bridgeData";
import { Button, ButtonGroup } from "@mui/material";
import Logo from "./logo.svg";
import Vashibridge from "./img/Vashi-bridge.png"
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      data: bridgeData,
      maxLoad: 0,
      address: null,
      topic: null
    };
    this.getData = this.getData.bind(this);
    this.handleJSONMessage = this.handleJSONMessage.bind(this);
  }
  setMaxLoad = () => {
    let load = prompt("Enter max load of the bridge in kg", "0");
    if (load != null) {
      this.setState({
        maxLoad: load,
      });
    }
  };
  setAddress = () => {
    let adr = prompt("Enter address");
    if (adr != null) {
      this.setState({
        address: adr,
      });
    }
  };
  setTopic = () => {
    let topic = prompt("Enter topic");
    if (topic != null) {
      this.setState({
        topic: topic,
      });
    }
  };
  sendOverLoad = () => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();
    let dateTime = date + " " + time;
    alert("⚠️ Overload during " + dateTime + " ⚠️");
  };

  handleJSONMessage(message) {
    let updatedData = message;
    this.setState ({
      data: updatedData
    });
    this.timer = setInterval(() => this.getData(), 60000);
  };

  getData=async ()=>{
    let response = await fetch('data/bridgedata.json',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }})
    let data = await response.json();
    this.handleJSONMessage(data.data)
  }

  render() {
    this.getData();
    return (
      <div className="App">
        <div className="Background-image">
          <header className="App-header">
            <img src={Logo} height={95} width={95} alt="Logo"/>
            <div className="Header-title">
              <h1>Bridge Watcher</h1>
            </div>
          </header>
          <div className="App-body">
            <div className="row">
              <div className="col">
                <div className="Bridge-title">
                  <h2>Vashi Bridge</h2>
                </div>
                <h4>Max Load = {this.state.maxLoad} kg</h4>
                <ButtonGroup orientation="vertical">
                  <Button
                    style={{
                      backgroundColor: "#564F99"
                    }}
                    size="large"
                    variant="contained"
                    onClick={() => {
                      this.setMaxLoad();
                    }}
                  >
                    Set Load Capacity
                  </Button>
                
                  <Button
                    style={{
                      backgroundColor: "#564F99"
                    }}
                    size="large"
                    variant="contained"
                    onClick={() => {
                      this.setAddress();
                    }}
                  >
                    Set Address
                  </Button>
                
                  <Button
                    style={{
                      backgroundColor: "#564F99"
                    }}
                    size="large" 
                    variant="contained"
                    onClick={() => {
                      this.setTopic();
                    }}
                  >
                    Set Topic
                  </Button>
                </ButtonGroup>
              </div>
              <div className="ImagePosition">
                <img src={Vashibridge} width={1000} alt="Bridge"/>
              </div>
            </div>
            <Database data={this.state.data}></Database>
          </div>
          {/* <Button
            variant="contained"
            onClick={() => {
              this.sendOverLoad();
            }}
          >
            Test Overload
          </Button> */}
          <div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
