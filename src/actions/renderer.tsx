import * as constants from "../constants";
import { RenderableState } from "../types/";

import { LayerAction } from "./layer";

export interface IanimatorsUpdated {
    type: constants.ANIMATORS_UPDATED;
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

export interface IupdateLayer {
    type: constants.UPDATE_LAYER;
    index: number;
    layerAction: LayerAction;
}

export type RendererAction =
    IanimatorsUpdated |
    IaddLayer |
    IremoveLayerAt |
    IupdateLayer |
    ImoveLayer;
