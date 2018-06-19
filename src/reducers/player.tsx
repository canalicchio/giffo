import { PlayerAction } from "../actions/player";

import {
    PAUSE,
    PLAY,
    SEEK_FRAME,
    SET_DURATION,
    SET_FPS,
    STEP_FRAME_BACKWARD,
    STEP_FRAME_FORWARD,
} from "../constants/";

import { PlayerState, StoreState } from "../types/index";

export const PlayerInitialState: PlayerState = {
    currentFrame: 0,
    duration: 2,
    fps: 12,
    playing: false,
};

export function playerReducer(state: PlayerState = PlayerInitialState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case PAUSE:
      return { ...state, playing: false };
    case PLAY:
      return { ...state, playing: true };
    case SEEK_FRAME:
      return {
          ...state,
          playing: false,

          currentFrame:
            Math.min(Math.max(action.frame, 0), state.duration * state.fps),
      };
    case SET_DURATION:
          return {
              ...state,
              duration: action.duration,
          };
    case SET_FPS:
          return {
              ...state,
              fps: action.fps,
          };
    case STEP_FRAME_BACKWARD:
      return {
          ...state,
          currentFrame: Math.max(state.currentFrame - 1, 0),
      };
    case STEP_FRAME_FORWARD:
      return {
          ...state,
          currentFrame: Math.min(state.duration * state.fps, state.currentFrame + 1),
      };
  }
  return state;
}

import {
    Middleware,
} from "redux";

let intervalIndex: any = null;

export const playerMiddleware: Middleware<PlayerAction|any, StoreState> =
    (store) => (next) => (action) =>  {

        const state = store.getState();

        if (action.type === PLAY && intervalIndex === null) {
            intervalIndex = setInterval(() => {
                const s = store.getState();
                if (s.player.currentFrame === s.player.duration * s.player.fps) {
                    store.dispatch({type: PAUSE});
                } else {
                    store.dispatch({type: STEP_FRAME_FORWARD});
                }
            }, 1000 / state.composition.fps);
        }
        if ((action.type === PAUSE || action.type === SEEK_FRAME) && intervalIndex !== null) {
            clearInterval(intervalIndex);
            intervalIndex = null;
        }
        next(action);
    };
