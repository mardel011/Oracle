import React from 'react';
import logo from './logo.svg';
import './App.css';
import Stock from './Stock.js';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/


/*class App extends React.Component{
  
  render(){

    return(
     <div>
      <Stock/>
      </div>
    )
  }

}
export default App;*/

function App() {
  return (
    <div className="App">
      <Stock />
    </div>
  );
}

export default App;
