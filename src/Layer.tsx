import * as React from "react";
import { connect } from "react-redux";

import {
    CompositionState,
    Property,
    RenderableState,
    StoreState,
} from "./types/";

import * as constants from "./constants";

interface IdispatchProps {
    onChangeFrame: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface IStateToProps {
    composition: CompositionState;
}

interface IProps {
    layer: RenderableState;
}

interface ILayerState {
    properties: Property[];
}

export type LayerProps = IStateToProps & IProps & IdispatchProps;

class Layer extends React.Component<LayerProps, ILayerState> {

    constructor(props: LayerProps) {
        super(props);

        this.state = {
            properties: [],
        };
    }

    public render() {

        return (
            <div className="layer">
                <div className="layer-details">
                    <div className="layer-label">Layer</div>
                    <div className="layer-timeline">
                        <div className="layer-duration" />
                    </div>
                </div>
                <div className="properties">
                    <div className="property-label">property</div>
                    <div className="property-timeline">
                        <div className="property-keyframes" />
                    </div>
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
