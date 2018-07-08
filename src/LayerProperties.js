import * as React from "react";
import { connect } from "react-redux";

import Layer from "./Layer";

class LayerProperties extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.layer.type) {
            this.layerTypeClass = require(`./layers/${this.props.layer.type}`).default;
        }
    }

    elementForProp(propertyName, property) {
        const lprops = {
            ...Layer.getLayerProperties(),
            ...this.layerTypeClass.getLayerProperties(),
        };

        const values = this.props.renderer.renderTree[this.props.index];
        const defaultValue = lprops[propertyName].defaultValue;
        const value = values ? values[propertyName] : defaultValue;
        return (
            <input
                className="settings-text"
                value={value}
            />
        );
    }

    render() {

        const lprops = {
            ...Layer.getLayerProperties(),
            ...this.layerTypeClass.getLayerProperties(),
        };

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
