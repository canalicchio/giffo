import * as React from "react";
import { connect } from "react-redux";

import {
    CompositionState,
    RenderableState,
    StoreState,
} from "./types/";

import * as constants from "./constants";

import { keyframesToAnimators } from "./helpers/layer";

import LayerProperty from "./Property";

interface IdispatchProps {
    onChangeFrame: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface IStateToProps {
    composition: CompositionState;
}

interface IProps {
    index: number;
    layer: RenderableState;
}

interface ILayerState {
    properties: any;
}

export type LayerProps = IStateToProps & IProps & IdispatchProps;

class Layer extends React.Component<LayerProps, ILayerState> {
    private values: any;

    constructor(props: LayerProps) {
        super(props);

        this.values = {};

        this.state = {
            properties: keyframesToAnimators(props.layer.keyframes, this.values),
        };
    }
    public componentWillReceiveProps(nextProps: LayerProps): void {

        this.setState({
            properties: keyframesToAnimators(nextProps.layer.keyframes, this.values),
        });
    }

    public render() {

        console.log(this.state.properties);
        const properties = Object.keys(this.state.properties);
        const framesStart = this.props.layer.start * this.props.composition.fps * 5;
        const framesDuration = this.props.layer.duration * this.props.composition.fps * 5;
        const layerDurationStyle: React.CSSProperties = {
            position: "absolute",

            bottom: 0,
            left: framesStart,
            width: framesDuration,
        };

        return (
            <div className="layer">
                <div className="layer-details">
                    <div className="layer-label">Layer</div>
                    <div className="layer-timeline">
                        <div className="layer-duration" style={layerDurationStyle} />
                    </div>
                </div>
                <div className="properties">
                    {properties.map((p, index) => {
                        const property = this.state.properties[p];
                        return (
                            <LayerProperty
                                key={`p-${p}-${index}`}
                                name={p}
                                property={property}
                                layerIndex={this.props.index}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: StoreState): IStateToProps => ({
    composition: state.composition,
});

const mapDispatchToProps = (dispatch: any, ownProps: any): IdispatchProps => ({
    onChangeFrame: (ev: React.MouseEvent<HTMLElement>) => {
        dispatch({
            type: constants.SEEK_FRAME,

            frame: ownProps.index,
        });
    },
});

const LayerConnected = connect(mapStateToProps, mapDispatchToProps)(Layer);

export default LayerConnected;
