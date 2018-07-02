import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { connect } from "react-redux";

import * as constants from "./constants";

import {
    CompositionState,
    PlayerState,
    Property,
    RendererState,
    StoreState,
} from "./types/";

import Svg from "./Svg";

interface IdispatchProps {
    onUpdateAnimators: () => void;
}

interface IStateToProps {
    composition: CompositionState;
    player: PlayerState;
    renderer: RendererState;
}

interface IRendererState {
    properties: Property[];
}

export type RendererProps = IStateToProps & IdispatchProps;

const ratio = 2;

class Renderer extends React.Component<RendererProps, IRendererState> {

    private img: HTMLImageElement;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(props: RendererProps) {
        super(props);

    }
    public drawImage() {
        try {
            if (this.ctx && this.img) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.img, 0, 0);
            }
        } catch (e) {
            console.log(e);
        }
    }
    public imageLoaded() {
        this.drawImage();
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

           this.canvas = canvas;
           this.ctx = ctx;
           this.img = rendererImg;
       }

    }

    public updateCanvasDimensions() {
        if (this.canvas && this.ctx) {
            if (ratio * this.props.composition.width !== this.canvas.width ||
                ratio * this.props.composition.height !== this.canvas.height) {
                this.canvas.width = this.props.composition.width * ratio;
                this.canvas.height = this.props.composition.height * ratio;

                this.canvas.style.width = this.props.composition.width + "px";
                this.canvas.style.height = this.props.composition.height + "px";
                this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
                this.ctx.scale(ratio, ratio);
            }
        }
    }

    public render() {
        this.updateCanvasDimensions();

        // map layer values to rendering objects
        const layers: any[] = [];
        this.props.composition.layers.forEach((layer, index) => {
            const values = this.props.renderer.renderTree[index];
            const layerStartFrame = layer.start * this.props.player.fps;
            const layerEndFrame = (layer.start + layer.duration) * this.props.player.fps;
            if (values && layerStartFrame <= this.props.player.currentFrame &&
                layerEndFrame >= this.props.player.currentFrame) {

                const style: React.CSSProperties = {
                    position: "absolute",

                    left: values.x as number,
                    top: values.y as number,
                };
                layers.push(<div key={layers.length} style={style}>ciao</div>);
            }
        });
        let data = renderToStaticMarkup(
            <Svg width={this.props.composition.width} height={this.props.composition.height}>
                {layers}
            </Svg>,
        );
        data = encodeURIComponent(data);
        const newSrc = `data:image/svg+xml,${data}`;
        if (this.img) {
            const src = this.img.src;
            if (src !== newSrc) {
                this.img.src = newSrc;
            }
        }
        return (
            null
        );
    }
}
const mapStateToProps = (state: StoreState): IStateToProps => ({
    composition: state.composition,
    player: state.player,
    renderer: state.renderer,
});

const mapDispatchToProps = (dispatch: any, ownProps: any): IdispatchProps => ({
    onUpdateAnimators: () => {
        dispatch({
            type: constants.ANIMATORS_UPDATED,
        });
    },

});

const RendererConnected = connect(mapStateToProps, mapDispatchToProps)(Renderer);

export default RendererConnected;
