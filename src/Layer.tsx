import * as React from "react";
import { connect } from "react-redux";

import {
    CompositionState,
    RenderableState,
    StoreState,
} from "./types/";

import * as constants from "./constants";

import LayerProperty from "./Property";

import { keyframesToProperties } from "./helpers/layer";

interface IdispatchProps {
    onDragEnd: (start: number) => void;
    onDragEndDuration: (duration: number) => void;
    onSelectLayer: (layer: number) => void;
}

interface IStateToProps {
    composition: CompositionState;
}

interface IProps {
    index: number;
    layer: RenderableState;
}

interface ILayerState {
    startXKeyframe: number;
    start: number;
    duration: number;
}

export type LayerProps = IStateToProps & IProps & IdispatchProps;

export class Layer extends React.Component<LayerProps, ILayerState> {

    public static getLayerProperties() {
        return {
            start: {
                type: "number",

                defaultValue: 0,
            },

            duration: {
                type: "number",

                defaultValue: 1,
            },

            x: {
                type: "number",

                defaultValue: 0,
            },
            y: {
                type: "number",

                defaultValue: 0,
            },

            opacity: {
                type: "number",

                defaultValue: 1,
            },
            scaleX: {
                type: "number",

                defaultValue: 1,
            },
            scaleY: {
                type: "number",

                defaultValue: 1,
            },

            background: {
                type: "color",

                defaultValue: "transparent",
            },
            foreground: {
                type: "color",

                defaultValue: "#000000",
            },
        };

    }

    public layerTypeClass: any;

    constructor(props: LayerProps) {
        super(props);

        this.state = {
            startXKeyframe: 0,

            duration: props.layer.duration,
            start: props.layer.start,
        };
        this.onDragStart = this.onDragStart.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDragDuration = this.onDragDuration.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragEndDuration = this.onDragEndDuration.bind(this);
        this.onSelectLayer = this.onSelectLayer.bind(this);
        if (this.props.layer.type) {
            this.layerTypeClass = require(`./layers/${this.props.layer.type}`).default;
        }

    }

    public componentWillReceiveProps(nextProps: LayerProps): void {

        this.setState({
            duration: nextProps.layer.duration,
            start: nextProps.layer.start,
        });
    }

    public onDragStart(e: React.DragEvent) {
        e.stopPropagation();
        const dragImgEl = document.createElement("span");
        dragImgEl.innerHTML = " . ";
        dragImgEl.style.display = "none";
        document.body.appendChild(dragImgEl);
        e.dataTransfer.setDragImage(dragImgEl, 0, 0);
        e.dataTransfer.dropEffect = "none";

        this.setState({
            startXKeyframe: e.clientX,
        });
    }

    public onDragEnd(e: React.DragEvent) {
        e.stopPropagation();
        this.props.onDragEnd(this.state.start);
    }

    public onDragEndDuration(e: React.DragEvent) {
        console.log(this.state.duration);
        this.props.onDragEndDuration(this.state.duration);
    }

    public onDrag(e: React.DragEvent) {
        e.stopPropagation();
        const singleStep = 5;
        const diffx = e.clientX - this.state.startXKeyframe;

        const steps = Math.ceil(diffx / singleStep);
        const newStart = this.props.layer.start + (steps / this.props.composition.fps);
        if (newStart >= 0) {
            this.setState({
                start: newStart,
            });
        }
    }

    public onDragDuration(e: React.DragEvent) {
        e.stopPropagation();
        const singleStep = 5;
        const diffx = e.clientX - this.state.startXKeyframe;

        const steps = Math.ceil(diffx / singleStep);
        const newDuration = this.props.layer.duration + (steps / this.props.composition.fps);
        if (newDuration >= 0) {
            this.setState({
                duration: newDuration,
            });
        }
    }

    public onSelectLayer(e: React.MouseEvent) {
        this.props.onSelectLayer(this.props.index);
    }

    public render() {

        // TODO don't run this every render
        const lprops = {
            ...Layer.getLayerProperties(),
            ...this.layerTypeClass.getLayerProperties(),
        };
        const kprops: any = keyframesToProperties(this.props.layer.keyframes);

        Object.keys(lprops).forEach((lp: string) => {
            lprops[lp].keyframes = kprops[lp] ? kprops[lp].keyframes : [];
        });
        // TODO!!

        const framesStart = this.state.start * this.props.composition.fps * 5;
        const framesDuration = this.state.duration * this.props.composition.fps * 5;
        const layerDurationStyle: React.CSSProperties = {
            position: "absolute",

            bottom: 0,
            left: framesStart,
            width: framesDuration,
        };

        return (
            <div className="layer" onClick={this.onSelectLayer}>
                <div className="layer-details">
                    <div className="layer-label">Layer</div>
                    <div className="layer-timeline">
                        <div
                            className="layer-duration"
                            style={layerDurationStyle}
                            draggable={true}
                            onDragStart={this.onDragStart}
                            onDrag={this.onDrag}
                            onDragEnd={this.onDragEnd}
                        >
                            <div
                                className="dragHandle"
                                draggable={true}
                                onDragStart={this.onDragStart}
                                onDrag={this.onDrag}
                                onDragEnd={this.onDragEnd}
                            />
                            <div
                                className="dragHandle"
                                draggable={true}
                                onDragStart={this.onDragStart}
                                onDrag={this.onDragDuration}
                                onDragEnd={this.onDragEndDuration}
                            />
                        </div>
                    </div>
                </div>
                <div className="properties">
                    {Object.keys(lprops).map((p: string, index: number) => {
                        const property = lprops[p];
                        return (
                            <LayerProperty
                                key={`p-${p}-${index}`}
                                name={p}
                                start={this.state.start}
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
    onDragEnd: (start: number) => {
        dispatch({
            type: constants.UPDATE_LAYER,

            index: ownProps.index,
            layerAction: {
                type: constants.SET_START,

                start,
            },
        });
    },
    onDragEndDuration: (duration: number) => {
        dispatch({
            type: constants.UPDATE_LAYER,

            index: ownProps.index,
            layerAction: {
                type: constants.SET_LAYER_DURATION,

                duration,
            },
        });
    },
    onSelectLayer: (layer: number) => {
        dispatch({
            type: constants.SELECT_LAYER,

            layer: ownProps.index,
        });
    },
});

const LayerConnected = connect(mapStateToProps, mapDispatchToProps)(Layer);

export default LayerConnected;
