import * as React from "react";
import { connect } from "react-redux";

import * as constants from "./constants";

import {
    CompositionState,
    Keyframe,
    StoreState,
} from "./types/";

interface IState {
    draggingKeyframe: boolean;
    startXKeyframe: number;
    startYKeyframe: number;
    keyframes: any[];
}

interface IStateToProps {
    composition: CompositionState;
}

interface IdispatchProps {
    onDragEnd: (keyframe: Keyframe) => void;
}

interface IProps {
    layerIndex: number;
    name: string;
    property: any;
}

export type LayerPropertyProps = IProps & IStateToProps & IdispatchProps;

class LayerProperty extends React.Component<LayerPropertyProps, IState> {
    constructor(props: LayerPropertyProps) {
        super(props);

        this.state = {
            draggingKeyframe: false,
            startXKeyframe: 0,
            startYKeyframe: 0,

            keyframes: props.property.keyframes,
        };
        this.onDragStartHandler = this.onDragStartHandler.bind(this);
        this.onDragHandler = this.onDragHandler.bind(this);
        this.onDragEndHandler = this.onDragEndHandler.bind(this);
    }

    public onDragStartHandler(index: number): React.DragEventHandler {
        return (e: React.DragEvent) => {
                const dragImgEl = document.createElement("span");
                dragImgEl.innerHTML = " . ";
                document.body.appendChild(dragImgEl);
                e.dataTransfer.setDragImage(dragImgEl, 0, 0);

                this.setState({
                    draggingKeyframe: true,
                    startXKeyframe: e.clientX,
                    startYKeyframe: e.clientY,
                });
        };
    }
    public onDragEndHandler(index: number): React.DragEventHandler {
        return (e: React.DragEvent) => {

            const k = this.state.keyframes[index];
            this.props.onDragEnd(k);

            this.setState({
                draggingKeyframe: false,
            });
        };
    }

    public onDragHandler(index: number): React.DragEventHandler {
        return (e: React.DragEvent) => {
            const singleStep = 5;
            const diffx = e.clientX - this.state.startXKeyframe;

            const steps = Math.ceil(diffx / singleStep);
            const newFrame = this.props.property.keyframes[index].frame + (steps / this.props.composition.fps * 1000);
            if (newFrame > 0) {
                this.setState({
                    keyframes: [
                        ...this.state.keyframes.slice(0, index),
                        {
                            ...this.state.keyframes[index],
                            frame: newFrame,
                        },
                        ...this.state.keyframes.slice(index + 1),
                    ],
                });
            }
        };
    }

    public render() {
        const keyframes = this.state.keyframes;
        return (
            <div>
                <div className="property-label">{this.props.name}:</div>
                <div className="property-timeline">
                    <div className="property-keyframes">
                        {keyframes.map((k: any, index: number) => {
                            const framesDuration = k.frame * this.props.composition.fps / 1000;
                            const style: React.CSSProperties = {
                                position: "absolute",

                                bottom: 3,
                                left: framesDuration * 5,
                            };
                            const onDragStart = this.onDragStartHandler(index).bind(this);
                            const onDrag = this.onDragHandler(index).bind(this);
                            const onDragEnd = this.onDragEndHandler(index).bind(this);
                            return (
                                <div
                                    key={`k-${k.id}`}
                                    className="keyframe"
                                    style={style}
                                    draggable={true}
                                    onDragStart={onDragStart}
                                    onDrag={onDrag}
                                    onDragEnd={onDragEnd}
                                />
                            );
                        })}
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
    onDragEnd: (keyframe: Keyframe) => {
        dispatch({
            type: constants.UPDATE_LAYER,

            index: ownProps.layerIndex,
            layerAction: {
                type: constants.UPDATE_KEYFRAME,

                keyframe,
            },
        });
    },
});

const LayerPropertyConnected = connect(mapStateToProps, mapDispatchToProps)(LayerProperty);

export default LayerPropertyConnected;
