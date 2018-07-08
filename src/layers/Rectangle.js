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
            width: {
                type: "number",

                defaultValue: 100,
            },

            height: {
                type: "number",

                defaultValue: 100,
            },
        };
    }

    render() {
        const label = this.props.label;
        const style = {
            ...this.props.style,

            display: "block",
            height: this.props.height,
            width: this.props.width,
        };

        return (
            <div className="rectangle" style={style}>
                <span>{label}</span>
            </div>
        );
    }
}

export default Rectangle;
