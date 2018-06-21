import * as constants from "../constants";

export interface IstepFrameForward {
    type: constants.STEP_FRAME_FORWARD;
}

export interface IstepFrameBackward {
    type: constants.STEP_FRAME_BACKWARD;
}

export interface Iplay {
    type: constants.PLAY;
}

export interface ItogglePlayPause {
    type: constants.TOGGLE_PLAYPAUSE;
}

export interface Ipause {
    type: constants.PAUSE;
}

export interface IseekFrame {
    type: constants.SEEK_FRAME;
    frame: number;
}
export interface IsetDuration {
    type: constants.SET_DURATION;
    duration: number;
}

export interface IsetFPS {
    type: constants.SET_FPS;
    fps: number;
}
export type PlayerAction =
    IstepFrameForward |
    IstepFrameBackward |
    Iplay |
    Ipause |
    ItogglePlayPause |
    IseekFrame |
    IsetDuration |
    IsetFPS;
