import * as React from "react";
import { connect } from "react-redux";

import Frames from "./Frames";

import Layers from "./Layers";

import {
    CompositionState,
    PlayerState,
    StoreState,
} from "./types/";

import * as constants from "./constants";

interface IState {
    canvas?: HTMLCanvasElement | null;
    ctx?: CanvasRenderingContext2D | null;
    img?: HTMLImageElement | null;
}

interface IProps {
    composition: CompositionState;
    player: PlayerState;

}
interface IdispatchProps {
    onChangeFrame: (frame: number) => void;
}

class Timeline extends React.Component<IProps & IdispatchProps, IState> {
    public render() {
        return (
            <div>
                <Frames />
                <Layers />
            </div>
        );
    }
}
const mapStateToProps = (state: StoreState): IProps => ({
    composition: state.composition,
    player: state.player,
});

const mapDispatchToProps = (dispatch: any): IdispatchProps => ({
    onChangeFrame: (frame: number) => {
        dispatch({
            type: constants.SEEK_FRAME,

            frame,
        });
    },

});

const TimelineConnected = connect(mapStateToProps, mapDispatchToProps)(Timeline);

export default TimelineConnected;
