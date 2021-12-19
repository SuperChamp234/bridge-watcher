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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className>Bridge Watcher 🌉</h1>
        </header>
        <div className="App-body">
          <h2>Vashi Bridge</h2>
          <h4>Max Load = {this.state.maxLoad} kg</h4>
          <Button
            variant="contained"
            onClick={() => {
              this.setMaxLoad();
            }}
          >
            Set Load Capacity
          </Button>
          <Database data={this.state.data}></Database>
        </div>
        <Button
          variant="contained"
          onClick={() => {
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
          }}
        >
          Test Overload
        </Button>
      </div>
    );
  }
}

export default App;
