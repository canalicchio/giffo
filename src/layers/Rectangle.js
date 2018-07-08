import * as React from "react";

// interface
// getLayerProperties()
//   return Array of
//      type: "string" | "number" | "color"
//      defaultValue: string, number
//
// render()
//   return
//     html

class Rectangle extends React.Component {

    static getLayerProperties() {
        return {
            label: {
                type: "string",

                defaultValue: "some free text",
            },

            background: {
                type: "string",

                defaultValue: "#ffc600",
            },

            cornerRadius: {
                type: "number",

                defaultValue: 3,
            },
        };
    }

    render() {
        const label = this.props.label;

        return (
            <div className="rectangle" style={this.props.style}>
                <span>{label}</span>
            </div>
        );
    }
}

export default Rectangle;
