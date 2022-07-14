import React from 'react';
import Player from "./components/Player/Player";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Player/>
      </div>
    </BrowserRouter>
  );
}

export default App;
