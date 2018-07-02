import * as React from "react";
import { connect } from "react-redux";

import Layer from "./Layer";

class LayerProperties extends React.Component {
    constructor(props) {
        super(props);

    }

    elementForProp(propertyName, property) {
        const values = this.props.renderer.renderTree[this.props.index];
        const value = values ? values[propertyName] : 0;
        return (
            <input
                className="settings-text"
                value={value}
            />
        );
    }

    render() {

        const lprops = Layer.getLayerProperties();
        return (
            <div className="pane">
                <div className="settings-title">Layer properties</div>
                {Object.keys(lprops).map((p) => (
                    <div key={`p-${p}`} className="settings-element">
                        <label className="settings-label">{p}:</label>
                        {this.elementForProp(p, lprops[p])}
                    </div>
                ))}
            </div>
        );
    }
}

export default LayerProperties;
