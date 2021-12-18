import * as React from 'react'
import '../App.css';
function Temperature(props) {
    return (
        <div>
            <p className='Temperature'>Temperature {props.temp}</p>
        </div>
    );
  }

export default Temperature;