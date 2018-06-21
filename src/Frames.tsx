import * as React from "react";
import { connect } from "react-redux";

import "./frames.css";

import {
    CompositionState,
    PlayerState,
    StoreState,
} from "./types/";

import * as constants from "./constants";

interface IdispatchProps {
    onChangeFrame: (ev: React.MouseEvent<HTMLElement>) => void;
}
interface IframeProps {
    zoom: number;
    index: number;
}
interface IframeStateProps {
    currentFrame: number;
}

const Frame: React.SFC<IframeProps & IdispatchProps & IframeStateProps> =
    ({index, zoom, currentFrame, onChangeFrame}) => (
        <div
            key={index}
            className={`frame ${index === currentFrame ? "current" : ""}`}
            style={{width: zoom * 5}}
            onMouseMove={onChangeFrame}
        />
    );

const frameMapDispatchToProps = (dispatch: any, ownProps: any): IdispatchProps => ({
    onChangeFrame: (ev: React.MouseEvent<HTMLElement>) => {
        dispatch({
            type: constants.SEEK_FRAME,

            frame: ownProps.index,
        });
    },
});

const frameMapStateToProps = (state: StoreState): IframeStateProps => ({
    currentFrame: state.player.currentFrame,
});

const FrameConnected = connect(frameMapStateToProps, frameMapDispatchToProps)(Frame);

interface IState {
    canvas?: HTMLCanvasElement | null;
    ctx?: CanvasRenderingContext2D | null;
    img?: HTMLImageElement | null;
}

interface IProps {
    composition: CompositionState;
    player: PlayerState;

}

class Frames extends React.Component<IProps & IdispatchProps, IState> {
    public render() {
        const frames = Array.from(Array(this.props.composition.duration * this.props.composition.fps));
        const zoom = 1;

        return (
            <div className="frames-slider">
                {frames.map((e, i) => (<FrameConnected key={i} zoom={zoom} index={i + 1} />))}
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

const FramesConnected = connect(mapStateToProps, mapDispatchToProps)(Frames);

export default FramesConnected;
