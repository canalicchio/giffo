import * as constants from "../constants";
import { Keyframe } from "../types/";

export interface IsetStart {
    type: constants.SET_START;
    start: number;
}

export interface IsetDuration {
    type: constants.SET_LAYER_DURATION;
    duration: number;
}

export interface IaddKeyframe {
    type: constants.ADD_KEYFRAME;
    keyframe: Keyframe;
}

export interface IremoveKeyframe {
    type: constants.REMOVE_KEYFRAME;
    id: string;
}

export interface IupdateKeyframe {
    type: constants.UPDATE_KEYFRAME;
    keyframe: Keyframe;
}

export type LayerAction =
    IsetStart |
    IsetDuration |
    IaddKeyframe |
    IremoveKeyframe |
    IupdateKeyframe;
