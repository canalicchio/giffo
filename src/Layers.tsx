import * as React from "react";
import { connect } from "react-redux";

import Layer from "./Layer";

import {
    CompositionState,
    PlayerState,
    StoreState,
} from "./types/";

import * as constants from "./constants";

interface IdispatchProps {
    onChangeFrame: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface IProps {
    composition: CompositionState;
    player: PlayerState;

}

class Layers extends React.Component<IProps & IdispatchProps> {
    public render() {
        const layers = this.props.composition.layers;
        return (
            <div className="layers">
                {layers.map((l, i) => (<Layer key={`layer-${i}`} className="layer" layer={l} index={i} />))}
            </div>
        );
    }
}
const mapStateToProps = (state: StoreState): IProps => ({
    composition: state.composition,
    player: state.player,
});

const mapDispatchToProps = (dispatch: any, ownProps: any): IdispatchProps => ({
    onChangeFrame: (ev: React.MouseEvent<HTMLElement>) => {
        dispatch({
            type: constants.SEEK_FRAME,

            frame: ownProps.index,
        });
    },
});

const LayersConnected = connect(mapStateToProps, mapDispatchToProps)(Layers);

export default LayersConnected;
