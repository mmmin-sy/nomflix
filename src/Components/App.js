import React, { Component} from 'react';
import Router from 'Components/Router';
import Header from 'Components/Header';
import "styles.css";

class App extends Component {
  render(){
    return (
      <>
        <Header className="nav" />
        <Router />
      </>
    )
  }
}

export default App;
