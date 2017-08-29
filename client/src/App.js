import React, { Component } from 'react';
import { BrowserRouter, Match } from 'react-router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import Events from './pages/Events';
import Contribute from './pages/Contribute';
// import Academy from './pages/Academy';
import About from './pages/About';

import  './styles/App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {({ location }) => (
          <div className="App-container">
            {/* hack while activeClassName is broken */}
            <Navbar home={location.pathname === '/'}/>
            <div className="App-content">
              <Match exactly pattern="/" component={Home} />
              <Match pattern="/about" component={About} />
              {/*<Match pattern="/events" component={Events} />*/}
              <Match pattern="/contribute" component={Contribute} />
              {/*<Match pattern="/academy" component={Academy} />*/}
            </div>
          </div>
        )}
      </BrowserRouter>
    )
  }
}

export default App;
