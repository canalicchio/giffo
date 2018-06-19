import { LayerAction } from "../actions/layer";

import {
    ADD_KEYFRAME,
    REMOVE_KEYFRAME,
    SET_LAYER_DURATION,
    SET_START,
    UPDATE_KEYFRAME,
} from "../constants/";

import { RenderableState } from "../types/index";

export const LayerInitialState: RenderableState = {
    duration: 100,
    start: 0,

    keyframes: [],
};

export function layerReducer(state: RenderableState = LayerInitialState, action: LayerAction): RenderableState {
    switch (action.type) {
        case ADD_KEYFRAME:
            return {
                ...state,
                keyframes: [
                    ...state.keyframes,
                    action.keyframe,
                ],
            };
        case REMOVE_KEYFRAME:
            return {
                ...state,
                keyframes: state.keyframes.filter((k) => k.id !== action.id),
            };
        case UPDATE_KEYFRAME:
            let index = -1;
            state.keyframes.forEach((k, i) => {
                if (k.id === action.keyframe.id) {
                    index = i;
                }
            });
            if (index !== -1) {
                return {
                    ...state,
                    keyframes: [
                        ...state.keyframes.slice(0, index),
                        {
                            ...state.keyframes[index],
                            ...action.keyframe,
                        },
                        ...state.keyframes.slice(index + 1),
                    ],
                };
            } else {
                return state;
            }
        case SET_LAYER_DURATION:
            return { ...state, duration: Math.max(1, action.duration) };
        case SET_START:
            return { ...state, start: Math.max(0, action.start) };
    }
    return state;
}
