import * as React from "react";

import "./App.css";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <div className="sidebar">
                    <div className="settings-title">Composition settings</div>
                    <div className="settings-element">
                    <label className="settings-label">composition Width:</label>
                    </div>
                    <div className="settings-element">
                    <label className="settings-label">composition Height:</label>
                    </div>
                    <div className="settings-element settings-color">
                    <label className="settings-label">transparent color:</label>
                    </div>
                    <div className="settings-element">
                    <label className="settings-label">duration (sec):</label>
                    </div>
                    <div className="settings-element">
                    <label className="settings-label">Frame per second</label>
                    </div>
                </div>
                <div className="player">
                    <button className="play-button">
                        <i className="play-icon" />
                    </button>
                    <button className="play-button">
                        <i className="record-icon" />
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
