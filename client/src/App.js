import React, { Component } from 'react';
import { BrowserRouter, Match } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Contribute from './pages/Contribute';

import  './styles/App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App-container">
          <Navbar/>
          <div className="App-content">
              <Match exactly pattern="/" component={Home} />
              <Match pattern="/events" component={Events} />
              <Match pattern="/contribute" component={Contribute} />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
