import React from 'react';
import logo from './logo.svg';
import './App.css';
import CanvasBoard from "./components/CanvasBoard";
import {Provider} from "react-redux";
import store from "./store";
import MainBar from "./components/MainBar";

function App() {
  return (
      <Provider store={store}>
    <div className="App">
     <MainBar/>
      <CanvasBoard height={600} width={600} cellSize={20}/>
    </div>
      </Provider>
  );
}

export default App;
