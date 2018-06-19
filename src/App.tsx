import * as React from "react";
import { connect } from "react-redux";

import {
    CompositionState,
    PlayerState,
    StoreState,
} from "./types/";

import * as constants from "./constants";

import "./App.css";

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
    onChangeDuration: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeFps: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeHeight: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeWidth: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const ratio = 2;
class App extends React.Component<IProps & IdispatchProps, IState> {
    constructor(props: IProps & IdispatchProps) {
        super(props);

        this.state = {
            canvas: null,
            ctx: null,
            img: null,
        };
    }

    public componentDidMount() {
       const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
       const rendererImg = document.getElementById("renderer") as HTMLImageElement;
       let ctx;
       if (canvas && rendererImg) {
           ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
           rendererImg.onload = () => {
               this.imageLoaded();
           };

           this.setState({
               canvas,
               ctx,
               img: rendererImg,
           });
       }

    }

    public imageLoaded() {
        console.log("imageLoaded");
    }

    public updateCanvasDimensions() {

        if (this.state && this.state.canvas && this.state.ctx) {
            if (ratio * this.props.composition.width !== this.state.canvas.width ||
                ratio * this.props.composition.height !== this.state.canvas.height) {
                this.state.canvas.width = this.props.composition.width * ratio;
                this.state.canvas.height = this.props.composition.height * ratio;

                this.state.canvas.style.width = this.props.composition.width + "px";
                this.state.canvas.style.height = this.props.composition.height + "px";
                this.state.ctx.scale(ratio, ratio);
            }
        }
    }

    public render() {
        this.updateCanvasDimensions();
        return (
            <div className="App">
                <div className="sidebar">
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
                <div className="player">
                    <button className="play-button">
                        <i className="play-icon" />
                    </button>
                    <button className="play-button">
                        <i className="record-icon" />
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState): IProps => ({
    composition: state.composition,
    player: state.player,
});

const mapDispatchToProps = (dispatch: any): IdispatchProps => ({
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
