import React from 'react';
import './App.css';
import routes from './routes'
import Nav from './Components/Nav/Nav'
import Dash from './Components/Dash/Dash';

function App() {
  return (
    <div className='App'>
        <Nav />
        {/* <Dash/> */}
        {routes}
    </div>
  )
};

export default App;
