import React from 'react';
import './App.css';
import routes from './routes'
import Nav from './Components/Nav/Nav'
import Dash from './Components/Dash/Dash';
import Socket from './Components/Seckets/Socket';

function App() {
  return (
    <div className='App'>
        {/* <Nav /> */}
        <Socket />
        {/* <Dash/> */}
        {/* {routes} */}
    </div>
  )
};

export default App;
  