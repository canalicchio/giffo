// PLAYER
export const PAUSE = "PAUSE";
export const PLAY = "PLAY";
export const TOGGLE_PLAYPAUSE = "TOGGLE_PLAYPAUSE";
export const SEEK_FRAME = "SEEK_FRAME";
export const SET_DURATION = "SET_DURATION";
export const SET_FPS = "SET_FPS";
export const STEP_FRAME_BACKWARD = "STEP_FRAME_BACKWARD";
export const STEP_FRAME_FORWARD = "STEP_FRAME_FORWARD";
export type PAUSE = typeof PAUSE;
export type PLAY = typeof PLAY;
export type TOGGLE_PLAYPAUSE = typeof TOGGLE_PLAYPAUSE;
export type SEEK_FRAME = typeof SEEK_FRAME;
export type SET_DURATION = typeof SET_DURATION;
export type SET_FPS = typeof SET_FPS;
export type STEP_FRAME_BACKWARD = typeof STEP_FRAME_BACKWARD;
export type STEP_FRAME_FORWARD = typeof STEP_FRAME_FORWARD;

// COMPOSITION

export const SET_WIDTH = "SET_WIDTH";
export const SET_HEIGHT = "SET_HEIGHT";
export const ADD_LAYER = "ADD_LAYER";
export const REMOVE_LAYER_AT = "REMOVE_LAYER_AT";
export const MOVE_LAYER = "MOVE_LAYER";
export const UPDATE_LAYER = "UPDATE_LAYER";
export type SET_WIDTH = typeof SET_WIDTH;
export type SET_HEIGHT = typeof SET_HEIGHT;
export type ADD_LAYER = typeof ADD_LAYER;
export type REMOVE_LAYER_AT = typeof REMOVE_LAYER_AT;
export type MOVE_LAYER = typeof MOVE_LAYER;
export type UPDATE_LAYER = typeof UPDATE_LAYER;

// LAYER

export const SET_START = "layer/SET_START";
export const SET_LAYER_DURATION = "layer/SET_LAYER_DURATION";
export const ADD_KEYFRAME = "layer/ADD_KEYFRAME";
export const REMOVE_KEYFRAME = "layer/REMOVE_KEYFRAME";
export const UPDATE_KEYFRAME = "layer/UPDATE_KEYFRAME";
export type SET_START = typeof SET_START;
export type SET_LAYER_DURATION = typeof SET_LAYER_DURATION;
export type ADD_KEYFRAME = typeof ADD_KEYFRAME;
export type REMOVE_KEYFRAME = typeof REMOVE_KEYFRAME;
export type UPDATE_KEYFRAME = typeof UPDATE_KEYFRAME;

// RENDERER
export const ANIMATORS_UPDATED = "ANIMATORS_UPDATED";
export type ANIMATORS_UPDATED = typeof ANIMATORS_UPDATED;
