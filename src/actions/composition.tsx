import * as constants from "../constants";
import { RenderableState } from "../types/";

import { LayerAction } from "./layer";

export interface IsetWidth {
    type: constants.SET_WIDTH;
    width: number;
}

export interface IsetHeight {
    type: constants.SET_HEIGHT;
    height: number;
}

export interface IaddLayer {
    type: constants.ADD_LAYER;
    layer: RenderableState;
}

export interface IremoveLayerAt {
    type: constants.REMOVE_LAYER_AT;
    at: number;
}

export interface ImoveLayer {
    type: constants.MOVE_LAYER;
    from: number;
    to: number;
}

export interface IsetDuration {
    type: constants.SET_DURATION;
    duration: number;
}

export interface IsetFPS {
    type: constants.SET_FPS;
    fps: number;
}

export interface IupdateLayer {
    type: constants.UPDATE_LAYER;
    index: number;
    layerAction: LayerAction;
}

export type CompositionAction =
    IsetDuration |
    IsetWidth |
    IsetHeight |
    IaddLayer |
    IsetFPS |
    IremoveLayerAt |
    IupdateLayer |
    ImoveLayer;
