import * as React from "react";
import Database from "./components/Database";
import bridgeData from "./bridgeData";
import { Button, ButtonGroup } from "@mui/material";
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className>Bridge Watcher 🌉</h1>
        </header>
        <div className="App-body">
          <h2>Vashi Bridge</h2>
          <h4>Max Load = {this.state.maxLoad} kg</h4>
          <ButtonGroup>
            <Button
              variant="contained"
              onClick={() => {
                this.setMaxLoad();
              }}
            >
              Set Load Capacity
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                this.setAddress();
              }}
            >
              Set Address
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                this.setTopic();
              }}
            >
              Set Topic
            </Button>
          </ButtonGroup>
          <Database data={this.state.data}></Database>
        </div>
        <Button
          variant="contained"
          onClick={() => {
            this.sendOverLoad();
          }}
        >
          Test Overload
        </Button>
      </div>
    );
  }
}

export default App;
