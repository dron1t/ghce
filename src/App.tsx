import React from 'react';
import './App.css';
import EncounterForm from "./EncounterForm";

function App() {

    return (
        <div className="App">
            <header className="App-header">
                GloomHaven Roads, Cities & Items
            </header>
            <div className={"content"}>
                <div className="panel city">
                    <h1>Roads</h1>
                    <EncounterForm type={"city"}></EncounterForm>
                </div>
                <div className="panel road">
                    <h1>Cities</h1>
                    <EncounterForm type={"road"}></EncounterForm>
                </div>
                <div className="panel items">
                    <h1>Items</h1>
                    <EncounterForm type={"items"}></EncounterForm>
                </div>
            </div>
        </div>
    );
}

export default App;
