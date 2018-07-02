import * as React from "react";
import { connect } from "react-redux";

import Timeline from "./Timeline";

import Renderer from "./Renderer";

import LayerProperties from "./LayerProperties";

import {
    CompositionState,
    PlayerState,
    RendererState,
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
    renderer: RendererState;
}
interface IdispatchProps {
    onChangeDuration: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeFps: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeHeight: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeWidth: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onPlay: (ev: React.MouseEvent<HTMLElement>) => void;
}

import "./App.css";

class App extends React.Component<IProps & IdispatchProps, IState> {
    constructor(props: IProps & IdispatchProps) {
        super(props);

        this.state = {
            canvas: null,
            ctx: null,
            img: null,
        };
    }

    public render() {
        return (
            <div className="App">
                <Renderer />
                <div className="sidebar">
                    <div className="pane">
                        <div className="settings-title">Composition settings</div>
                        <div className="settings-element">
                            <label className="settings-label">composition Width:</label>
                            <input
                                className="settings-text"
                                type="number"
                                value={this.props.composition.width}
                                onChange={this.props.onChangeWidth}
                            />
                        </div>
                        <div className="settings-element">
                            <label className="settings-label">composition Height:</label>
                            <input
                                className="settings-text"
                                type="number"
                                value={this.props.composition.height}
                                onChange={this.props.onChangeHeight}
                            />
                        </div>
                        <div className="settings-element settings-color">
                            <label className="settings-label">transparent color:</label>
                        </div>
                        <div className="settings-element">
                            <label className="settings-label">duration (sec):</label>
                            <input
                                className="settings-text"
                                type="number"
                                value={this.props.composition.duration}
                                onChange={this.props.onChangeDuration}
                            />
                        </div>
                        <div className="settings-element">
                            <label className="settings-label">Frame per second</label>
                            <input
                                    className="settings-text"
                                    type="number"
                                    value={this.props.composition.fps}
                                    onChange={this.props.onChangeFps}
                            />
                        </div>
                    </div>
                    {
                        <LayerProperties
                            layer={this.props.composition.layers[0]}
                            index={0}
                            renderer={this.props.renderer}
                        />
                    }
                </div>
                <div className="player">
                    <button className="play-button" onClick={this.props.onPlay}>
                        <i className="play-icon" />
                    </button>
                    <button className="play-button">
                        <i className="record-icon" />
                    </button>
                </div>
                <Timeline />
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState): IProps => ({
    composition: state.composition,
    player: state.player,
    renderer: state.renderer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any): IdispatchProps => ({
    onPlay: (ev: React.MouseEvent<HTMLElement>) => {
        dispatch({
            type: constants.PLAY,
        });
    },

    onChangeDuration: (ev: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: constants.SET_DURATION,

            duration: parseInt(ev.target.value, 10),
        });
    },

    onChangeWidth: (ev: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: constants.SET_WIDTH,

            width: parseInt(ev.target.value, 10),
        });
    },

    onChangeHeight: (ev: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: constants.SET_HEIGHT,

            height: parseInt(ev.target.value, 10),
        });
    },

    onChangeFps: (ev: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: constants.SET_FPS,

            fps: parseInt(ev.target.value, 10),
        });
    },
});
const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;
