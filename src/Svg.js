import * as React from "react";

const Svg = (props) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height}>
            <foreignObject width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml" style={{
                    fontFamily: "sans-serif",
                    fontSize: 30,
                    fontWeight: "bold",
                    }}>
                    {props.children}
                </div>
            </foreignObject>
        </svg>
    );
};

export default Svg;
